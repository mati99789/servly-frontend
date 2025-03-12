import { HttpInterceptorFn, HttpHandlerFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
export const isLoggedIn$ = refreshTokenSubject.asObservable();

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {

    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return handle401Error(req, next);
            }
            return throwError(() => error);
        })
    );
};

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
    const authService = inject(AuthService);
    if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null)

        return authService.refreshToken().pipe(
            switchMap(() => {
                isRefreshing = false;
                refreshTokenSubject.next(true);
                return next(req);
            }),
            catchError(refreshError => {
                isRefreshing = false;
                authService.signOut();
                return throwError(() => refreshError);
            }),
            finalize(() => {
                isRefreshing = false;
            })
        )
    } else {
        return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(() => next(req))
        )
    }
}
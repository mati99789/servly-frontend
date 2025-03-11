import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
    console.log('refreshTokenInterceptor', req);
    
    return next(req).pipe(
        catchError((error) => {
            return throwError(() => error);
        })
    );
}
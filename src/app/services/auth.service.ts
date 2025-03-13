import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, take, tap, throwError } from "rxjs";
import { User } from "../dtos/user";
import { HttpService } from "./http.service";
import { AuthRequest } from "../dtos/auth-dto";
import { ErrorResponse } from "../dtos/error-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public currentUser$ = this.currentUserSubject.asObservable();
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

    private httpService = inject(HttpService);


    private checkInitialAuthState() {
        const storedUser = localStorage.getItem('currentUser');

        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            this.currentUserSubject.next(user);
            this.isLoggedInSubject.next(true);
        }
    }


    // TODO: Ask backend for return user 
    login(credentials: AuthRequest): Observable<void> {
        return this.httpService.post<void>('/api/auth/login', credentials).pipe(
            tap(() => {
                this.isLoggedInSubject.next(true)
            }),
            catchError((error: ErrorResponse) => {
                return throwError(() => error)
            })
        )
    }

    logout(): Observable<void> {
        return this.httpService.post<void>('api/auth/sec/logout', {}).pipe(
            take(1),
            tap({
                complete: () => {
                    this.isLoggedInSubject.next(false);
                    this.currentUserSubject.next(null);
                    localStorage.removeItem('currentUser');
                }
            }),
            catchError((error: ErrorResponse) => {
                this.isLoggedInSubject.next(false);
                this.currentUserSubject.next(null);
                localStorage.removeItem('currentUser');

                return throwError(() => error)
            })
        )
    }


    //TODO: Czy backednd rzeczywiscie loguje uzytkownika po resjstracji( ustawia toekn w ciasterchak czy zwraca dane sesji?)
    register(credentials: AuthRequest): Observable<void> {
        return this.httpService.post<void>('/api/auth/register', credentials).pipe(
            tap({
                next: () => {
                    this.isLoggedInSubject.next(true)
                }
            }),
            catchError((error: ErrorResponse) => {
                return throwError(() => error)
            })
        )
    }


    refreshToken(): Observable<void> {
        return this.httpService.post<void>('api/auth/sec/refresh-token', {})
    }
}
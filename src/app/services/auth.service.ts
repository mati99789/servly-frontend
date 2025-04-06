import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, switchMap, take, tap, throwError} from "rxjs";
import {Role, User} from "../dtos/user";
import {HttpService} from "./http.service";
import {AuthRequest} from "../dtos/auth-dto";
import {ErrorResponse} from "../dtos/error-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public currentUser$ = this.currentUserSubject.asObservable();
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();
    public isAdmin$ = this.currentUserSubject.asObservable().pipe(
      map(user=> !!user && user.roles.includes(Role.ADMIN)),
    )


    constructor(private httpService: HttpService) {
        this.checkInitialAuthState();
    }

    private checkInitialAuthState() {
        const storedUser = localStorage.getItem('currentUser');

        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            this.currentUserSubject.next(user);
            this.isLoggedInSubject.next(true);
        }
    }


    login(credentials: AuthRequest): Observable<void> {
        return this.httpService.post<void>('auth/login', credentials).pipe(
            tap(() => {
                this.isLoggedInSubject.next(true)

            }),
            switchMap(() => this.fetchUser()),
            map(() => void 0),
            catchError((error: ErrorResponse) => {
                return throwError(() => error)
            })
        )
    }

    logout(): Observable<void> {
        return this.httpService.post<void>('auth/sec/logout', {}).pipe(
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
        return this.httpService.post<void>('auth/register', credentials, undefined, true).pipe(
            tap(() => {
                console.log('register - przed switchMap');
            }),
            switchMap(() => {
                console.log('wchodzę do switchMap');
                return this.fetchUser();
            }),
            map(() => {
                console.log('po fetchUser');
                return void 0;
            }),
            catchError((error: ErrorResponse) => {
                console.error('Błąd w register:', error);
                return throwError(() => error);
            })
        );
    }


    refreshToken(): Observable<void> {
        return this.httpService.post<void>('auth/sec/refresh-token', {})
    }


    fetchUser(): Observable<User> {
        return this.httpService.get<User>('user/me').pipe(
            tap((user) => {
                console.log('fetchUser', user);

                this.currentUserSubject.next(user);
                this.isLoggedInSubject.next(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }),
            catchError((error: ErrorResponse) => {
                this.isLoggedInSubject.next(false);
                this.currentUserSubject.next(null);
                localStorage.removeItem('currentUser');

                return throwError(() => error)
            }),
            take(1)
        )
    }
}

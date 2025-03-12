import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    logIn(){
        console.log('logIn');
    }

    refreshToken(): Observable<any>{
        console.log('refreshToken');
        return of(true);
    }

    signOut(){
        console.log('signOut');
    }
}
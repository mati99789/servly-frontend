import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    // TODO: change to environment variable
    private readonly API_URL = 'http://localhost:8080/api';
    
    constructor(private http: HttpClient) {}

    get<T>(url:string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(`${this.API_URL}/${url}`, { params, headers });
    }

    post<T>(url:string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.API_URL}/${url}`, body, { headers });
    }   

    put<T>(url:string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(`${this.API_URL}/${url}`, body, { headers });
    }

    delete<T>(url:string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(`${this.API_URL}/${url}`, { headers });
    }
}
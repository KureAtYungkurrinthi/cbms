import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { StorageUtil } from "src/app/_helpers/storage.util";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  url: string;

  constructor(public http: HttpClient, private router: Router) {
    this.url = environment.apiUrl + "/v1";
  }

  post(apiRoute: string, body: any) {
    return this.http.post(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  get<T>(apiRoute: string): Observable<T> {
    return this.http.get<T>(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  put<T>(apiRoute: string, body: any) : Observable<T>{
    return this.http.put<T>(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = StorageUtil.getItem('accessToken'); // Ensure this key matches your actual storage key for the token
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError = (error: any) => {
    if (error.status === 401 || error.status === 403) {
      // If 401 Unauthorized or 403 Forbidden, redirect to the login page
      this.router.navigate(['/login']);
    }
    // Continue throwing the error to be handled by other error handling if necessary
    return throwError(error);
  }
}

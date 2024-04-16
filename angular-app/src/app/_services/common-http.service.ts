import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  url: string;
  constructor(public http: HttpClient) {
    this.url = environment.apiUrl + "/v1";
  }

  post(apiRoute: string, body: any) {
    return this.http.post(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }

  get<T>(apiRoute: string): Observable<T> {
    return this.http.get<T>(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }

  put(apiRoute: string, body: any) {
    return this.http.put(`${this.url + apiRoute}`, body, { headers: this.getHttpHeaders() });
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`, { headers: this.getHttpHeaders() });
  }

  getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('accessToken'); // Replace 'access_token' with your token's key
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {StorageUtil} from "src/app/_helpers/storage.util";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(StorageUtil.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get userObservable() {
    return this.user;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth`, { "email": username, "password": password })
      .pipe(map(obj => {
        var accessToken = obj['accessToken'];
        var user = obj['user'];
        console.log(accessToken);
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        StorageUtil.setItem('user', JSON.stringify(user));
        StorageUtil.setItem('accessToken', accessToken);
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    StorageUtil.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}

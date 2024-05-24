import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommonHttpService } from "src/app/_services/common-http.service";
import {User} from "src/app/_models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient, private commonHttpService: CommonHttpService) { }

  getAll(): Observable<User[]> {
    if (this.usersSubject.value) {
      return this.users$;
    } else {
      return this.commonHttpService.get<User[]>('/users').pipe(
        tap(users => {
          this.usersSubject.next(users);
        }),
        catchError(error => {
          console.error('Error fetching users', error);
          return [];
        })
      );
    }
  }
}

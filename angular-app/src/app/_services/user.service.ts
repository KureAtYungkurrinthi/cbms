import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "src/app/_models/user";
import {environment} from "src/environments/environment";
import {CommonHttpService} from "src/app/_services/common-http.service";


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private commonHttpService:CommonHttpService) { }

  getAll() {
    console.log("calling user get service");
    return this.commonHttpService.get<User[]>('/users');
  }
}

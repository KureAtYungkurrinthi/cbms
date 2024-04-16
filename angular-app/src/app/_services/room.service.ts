import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonHttpService} from "src/app/_services/common-http.service";
import {User} from "src/app/_models/user";
import {Room} from "src/app/_models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private commonHttpService:CommonHttpService) { }

  getAll() {
    console.log("calling room get service");
    return this.commonHttpService.get<Room[]>('/rooms');
  }
}

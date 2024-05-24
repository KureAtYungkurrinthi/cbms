import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Room } from "src/app/_models/room.model";
import { CommonHttpService } from "src/app/_services/common-http.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsSubject: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(null);
  public rooms$: Observable<Room[]> = this.roomsSubject.asObservable();

  constructor(private commonHttpService: CommonHttpService) { }

  getAll(): Observable<Room[]> {
    if (this.roomsSubject.value) {
      return this.rooms$;
    } else {
      return this.commonHttpService.get<Room[]>('/rooms').pipe(
        tap(rooms => {
          this.roomsSubject.next(rooms);
        }),
        catchError(error => {
          console.error('Error fetching rooms', error);
          return [];
        })
      );
    }
  }
}

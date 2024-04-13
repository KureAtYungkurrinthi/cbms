import { Injectable } from '@angular/core';
import {MeetingList} from "src/app/_models/meeting-list";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {


  private meetings: MeetingList[] = [
    new MeetingList(1, 'Meeting Title 1', '11/03/24', '10:00 AM', 'Visionary Room A'),
    new MeetingList(2, 'Meeting Title 2', '14/03/24', '09:30 AM', 'Visionary Room C'),
    new MeetingList(3, 'Meeting Title 3', '20/03/24', '02:30 PM', 'Board Room A'),
    new MeetingList(4, 'Meeting Title 4', '09/04/24', '09:00 AM', 'Board Room B'),
    new MeetingList(5, 'Meeting Title 5', '11/04/24', '09:00 AM', 'Board Room A'),
  ];


  constructor() { }

  getMeetings(): Observable<MeetingList[]> {
    return of(this.meetings);
  }
}

import { Injectable } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {


  private meetings: Meeting[] = [
    new Meeting(1, 'Meeting Title 1', '2024-03-11', '10:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Visionary Room A'),
    new Meeting(2, 'Meeting Title 2', '2024-03-14', '09:30 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Visionary Room C'),
    new Meeting(3, 'Meeting Title 3', '2024-03-20', '02:30 PM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room A'),
    new Meeting(4, 'Meeting Title 4', '2024-03-21', '09:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room B'),
    new Meeting(5, 'Meeting Title 5', '2024-03-28', '09:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room A'),
  ];


  constructor() { }

  public pushMeeting(meeting: Meeting) {
    this.meetings.push(meeting);
  }

  getMeetings(): Observable<Meeting[]> {
    return of(this.meetings);
  }

  // getMeetingById(id: number): Observable<Meeting | undefined> {
  //   const meeting = this.meetings.find(meeting => meeting.id === id);
  //   return of(meeting);
  // }

  getMeetingById(id: number):Meeting | undefined {
    return this.meetings.find(meeting => meeting.id === id);
  }
}

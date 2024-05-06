import { Injectable } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {Observable, of} from "rxjs";
import {Agenda} from "src/app/_models/agenda.model";
import {User} from "src/app/_models/user";
import { tap, catchError } from 'rxjs/operators';
import {CommonHttpService} from "src/app/_services/common-http.service";

@Injectable({
  providedIn: 'root'
})
export class MeetingListService {
  //
  //
  // // private meetings: Meeting[] = [
  // //   new Meeting(1, 'Meeting Title 1', '2024-03-11', '10:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Visionary Room A'),
  // //   new Meeting(2, 'Meeting Title 2', '2024-03-14', '09:30 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Visionary Room C'),
  // //   new Meeting(3, 'Meeting Title 3', '2024-03-20', '02:30 PM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room A'),
  // //   new Meeting(4, 'Meeting Title 4', '2024-03-21', '09:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room B'),
  // //   new Meeting(5, 'Meeting Title 5', '2024-03-28', '09:00 AM', '10:00 AM', '10:00 AM', 'attendee 1', 'Board Room A'),
  // // ];
  //
  // private meetings: Meeting[] = [
  //   // new Meeting(1, 'Meeting Title 1', '2024-03-11', '10:00 AM', 'Visionary Room A', 'notes', 'attendee 1',  '10:00 AM', '10:00 AM',
  //   //   new Agenda(1, 30, 'John Doe', 'User 1, User 2', 60, 'Review quarterly goals', 'Implement new strategies', 'Alice Johnson', 120, 'Discussed last quarter', 'Completed follow-ups', 'Bob Smith', 15, 'Final remarks', 2)),
  //   // new Meeting(2, 'Meeting Title 1 - to delete', '2024-03-11', '10:00 AM', 'Visionary Room A', 'notes', 'attendee 1',  '10:00 AM', '10:00 AM',
  //   //   new Agenda(2, 30, 'John Doe', 'User 1, User 2', 60, 'Review quarterly goals', 'Implement new strategies', 'Alice Johnson', 120, 'Discussed last quarter', 'Completed follow-ups', 'Bob Smith', 15, 'Final remarks', 2)),
  //   // new Meeting(3, 'Meeting Title 2', '2024-03-14', '09:30 AM', 'Visionary Room B', 'notes', 'attendee 1'),
  //   // new Meeting(4, 'Meeting Title 3', '2024-03-20', '02:30 PM', 'Visionary Room C', 'notes', 'attendee 1'),
  //   // new Meeting(5, 'Meeting Title 4', '2024-03-21', '09:00 AM', 'Visionary Room D', 'notes', 'attendee 1'),
  //   // new Meeting(6, 'Meeting Title 5', '2024-03-28', '09:00 AM', 'Visionary Room C', 'notes', 'attendee 1')
  // ];
  //
  //
  // constructor(private commonHttpService:CommonHttpService) { }
  //
  // public pushMeeting(meeting: Meeting) {
  //   this.meetings.push(meeting);
  // }
  //
  // getMeetings(): Observable<Meeting[]> {
  //   console.log("calling user get service");
  //   return this.commonHttpService.get<Meeting[]>('/meetings');
  // }
  //
  // // getMeetingById(id: number): Observable<Meeting | undefined> {
  // //   const meeting = this.meetings.find(meeting => meeting.id === id);
  // //   return of(meeting);
  // // }
  //
  // getMeetingById(id: number):Meeting | undefined {
  //   return this.meetings.find(meeting => meeting.id === id);
  // }
  //
  // addAgendaToMeeting(id: number, agenda: Agenda) {
  //   const meeting: Meeting = this.getMeetingById(id);
  //   meeting.agenda = agenda;
  //   console.log(meeting);
  // }
  //
  // deleteAgenda(id: number) {
  //   const meeting: Meeting = this.getMeetingById(id);
  //   meeting.agenda = null;
  //   // call service
  // }


  // lazy initialization
  private meetings: Meeting[] = null;

  constructor(private commonHttpService: CommonHttpService) { }

  getMeetings(): Observable<Meeting[]> {
    if (this.meetings) {
      return of(this.meetings);
    } else {
      return this.commonHttpService.get<Meeting[]>('/meetings').pipe(
        tap(fetchedMeetings => {
          this.meetings = fetchedMeetings
        }),
        catchError(error => {
          console.error('Error fetching meetings', error);
          return of([]); // return an empty array on error
        })
      );
    }
  }

  pushMeeting(meeting: Meeting) {
    if (!this.meetings) {
      this.meetings = [];
    }
    this.createMeeting(meeting).subscribe((value ) => {
      console.log(value);
      this.meetings.push(meeting);
    })
  }

  getMeetingById(id: number): Meeting | undefined {
    return this.meetings?.find(meeting => meeting.id === id);
  }

  addAgendaToMeeting(id: number, agenda: Agenda) {
    const meeting = this.getMeetingById(id);
    if (meeting) {
      meeting.agenda = agenda;
      console.log('Updated meeting with new agenda:', meeting);
    }
  }

  deleteAgenda(id: number) {
    const meeting = this.getMeetingById(id);
    if (meeting) {
      meeting.agenda = null;
      console.log('Agenda removed from meeting:', meeting);
    }
  }

  getAgenda(id: number): Observable<Agenda> {
    return this.commonHttpService.get<Agenda>('/meetings/' + id + '/agendas');
  }

  updateMeeting(meeting: Meeting) {
   return this.commonHttpService.put("/meetings/" + meeting.id, meeting);
  }

  publishMeeting(meeting: Meeting) {
    meeting.isPublished = true;
    return this.updateMeeting( meeting);
  }

  private createMeeting(meeting: Meeting) {
    return this.commonHttpService.post('/meetings/', meeting);
  }

  deleteMeeting(meetingId: number) {
    this.meetings = this.meetings.filter(meeting => meeting.id != meetingId);
    return this.commonHttpService.delete('/meetings/' + meetingId);
  }
}

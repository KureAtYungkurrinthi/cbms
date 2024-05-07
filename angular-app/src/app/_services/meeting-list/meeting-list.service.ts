import { Injectable } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Agenda} from "src/app/_models/agenda.model";
import {User} from "src/app/_models/user";
import { tap, catchError } from 'rxjs/operators';
import {CommonHttpService} from "src/app/_services/common-http.service";
import {ActivatedRoute, Router} from "@angular/router";

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


  // // lazy initialization
  // private meetings: Meeting[] = null;
  // private meetingsSubject: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);
  // public meetings$: Observable<Meeting[]> = this.meetingsSubject.asObservable();
  //
  // constructor(private commonHttpService: CommonHttpService) { }
  //
  // getMeetings(): Observable<Meeting[]> {
  //   if (this.meetings) {
  //     return of(this.meetings);
  //   } else {
  //     return this.commonHttpService.get<Meeting[]>('/meetings').pipe(
  //       tap(fetchedMeetings => {
  //         this.meetings = fetchedMeetings
  //       }),
  //       catchError(error => {
  //         console.error('Error fetching meetings', error);
  //         return of([]); // return an empty array on error
  //       })
  //     );
  //   }
  // }
  //
  // pushMeeting(meeting: Meeting) {
  //   if (!this.meetings) {
  //     this.meetings = [];
  //   }
  //   this.createMeeting(meeting).subscribe((value ) => {
  //     console.log(value);
  //     this.meetings.push(meeting);
  //   })
  // }
  //
  // getMeetingById(id: number): Meeting | undefined {
  //   return this.meetings?.find(meeting => meeting.id === id);
  // }
  //
  // addAgendaToMeeting(id: number, agenda: Agenda) {
  //   const meeting = this.getMeetingById(id);
  //   if (meeting) {
  //     meeting.agenda = agenda;
  //     console.log('Updated meeting with new agenda:', meeting);
  //   }
  // }
  //
  // deleteAgenda(id: number) {
  //   const meeting = this.getMeetingById(id);
  //   if (meeting) {
  //     meeting.agenda = null;
  //     console.log('Agenda removed from meeting:', meeting);
  //   }
  // }
  //
  // getAgenda(id: number): Observable<Agenda> {
  //   return this.commonHttpService.get<Agenda>('/meetings/' + id + '/agendas');
  // }
  //
  // updateMeeting(meeting: Meeting) {
  //  return this.commonHttpService.put("/meetings/" + meeting.id, meeting);
  // }
  //
  // publishMeeting(meeting: Meeting) {
  //   meeting.isPublished = true;
  //   return this.updateMeeting( meeting);
  // }
  //
  // private createMeeting(meeting: Meeting) {
  //   return this.commonHttpService.post('/meetings/', meeting);
  // }
  //
  // deleteMeeting(meetingId: number) {
  //   this.meetings = this.meetings.filter(meeting => meeting.id != meetingId);
  //   console.log(this.meetings);
  //   return this.commonHttpService.delete('/meetings/' + 133);
  // }

  private meetingsSubject: BehaviorSubject<Meeting[]> = new BehaviorSubject<Meeting[]>([]);
  public meetings$: Observable<Meeting[]> = this.meetingsSubject.asObservable();

  constructor(private commonHttpService: CommonHttpService,
              private router: Router,
              ) {
    this.loadInitialMeetings();
  }

  private loadInitialMeetings() {
    this.commonHttpService.get<Meeting[]>('/meetings').pipe(
      catchError(error => {
        console.error('Error fetching meetings', error);
        return []; // Optionally, return an empty array on error
      })
    ).subscribe(meetings => {
      this.meetingsSubject.next(meetings);
    });
  }

  getMeetings(): Observable<Meeting[]> {
    return this.meetings$; // Return the observable for components to subscribe
  }

  private createMeeting(meeting: Meeting): Observable<Meeting> {
    // @ts-ignore
    return this.commonHttpService.post<Meeting>('/meetings', meeting).pipe(
      tap(addedMeeting => {
        console.log('Meeting created:', addedMeeting);

        return addedMeeting;
      }),
      catchError(error => {
        console.error('Error creating meeting', error);
        throw error;
      })
    );
  }

  addMeeting(meeting: Meeting): void {
    console.log("checking add meeting");
    console.log(meeting);
    this.createMeeting(meeting).subscribe(addedMeeting => {
      meeting.id = addedMeeting["meeting"]["id"];
      const updatedMeetings = [...this.meetingsSubject.value, meeting];
      console.log(updatedMeetings);
      this.meetingsSubject.next(updatedMeetings);
    });
  }

  deleteMeeting(meetingId: number): void {
    this.commonHttpService.delete('/meetings/' + meetingId).subscribe(() => {
      const updatedMeetings = this.meetingsSubject.value.filter(meeting => meeting.id !== meetingId);
      this.meetingsSubject.next(updatedMeetings);
      // this.router.navigate(['/dashboard']);
    }, () => {
      const updatedMeetings = this.meetingsSubject.value.filter(meeting => meeting.id !== meetingId);
      this.meetingsSubject.next(updatedMeetings);
      // this.router.navigate(['/dashboard']);
    });
  }



  getMeetingById(id: number): Observable<Meeting> {
    const meeting = this.meetingsSubject.value.find(m => m.id === id);
    return of(meeting); // Convert the result to an Observable
  }

  getAgenda(meetingId: number): Observable<Agenda> {
    return this.commonHttpService.get<Agenda>('/meetings/' + meetingId + '/agenda').pipe(
      catchError(error => {
        console.error('Error fetching agenda', error);
        return of(null); // Return null or an appropriate default object on error
      })
    );
  }

  publishMeeting(meeting: Meeting): Observable<Meeting> {
    meeting.isPublished = true;
    // @ts-ignore
    return this.commonHttpService.put<Meeting>("/meetings/" + meeting.id, meeting).pipe(
      tap(publishedMeeting => {
        const index = this.meetingsSubject.value.findIndex(m => m.id === meeting.id);
        if (index !== -1) {
          const updatedMeetings = [...this.meetingsSubject.value];
          if (publishedMeeting instanceof Meeting) {
            updatedMeetings[index] = meeting;
          }
          this.meetingsSubject.next(updatedMeetings);
        }
        console.log('Meeting published:', publishedMeeting);
      }),
      catchError(error => {
        console.error('Error publishing meeting', error);
        throw error;
      })
    );
  }

  // updateMeeting(meeting: Meeting): void {
  //   console.log("checking add meeting");
  //   console.log(meeting);
  //   this.createMeeting(meeting).subscribe(addedMeeting => {
  //     meeting.id = addedMeeting["meeting"]["id"];
  //     const updatedMeetings = [...this.meetingsSubject.value, meeting];
  //     console.log(updatedMeetings);
  //     this.meetingsSubject.next(updatedMeetings);
  //   });
  // }

  updateMeeting(meeting: Meeting) {
    this.commonHttpService.put<Meeting>("/meetings/" + meeting.id, meeting).subscribe(
      (updatedMeeting => {
        const index = this.meetingsSubject.value.findIndex(m => m.id === meeting.id);
        console.log("checking index");
        console.log(index);
        const updatedMeetings = [...this.meetingsSubject.value];
        // if (updatedMeeting instanceof Meeting) {
          updatedMeetings[index] = meeting;
        // }
        this.meetingsSubject.next(updatedMeetings);
        console.log('Meeting updated:', updatedMeetings);
      }),
      (error => {
        console.error('Error updating meeting', error);
        throw error;
      })
    );
  }

  deleteAgenda(id: number) {
    // const meeting: Meeting = this.getMeetingById(id);
    // meeting.agenda = null;
    // call service
  }

  // public addAgendaToMeeting(meetingId: number, agenda: Agenda): void {
  //   const update = { agenda: agenda };
  //   // this.commonHttpService.post<Meeting>(`/meetings/${meetingId}`, update).subscribe({
  //   //   next: (updatedMeeting) => {
  //   //     const index = this.meetingsSubject.value.findIndex(m => m.id === meetingId);
  //   //     if (index !== -1) {
  //   //       const updatedMeetings = [...this.meetingsSubject.value];
  //   //       updatedMeetings[index] = updatedMeeting;
  //   //       this.meetingsSubject.next(updatedMeetings);
  //   //       console.log('Agenda added to meeting:', updatedMeeting);
  //   //     }
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Error adding agenda to meeting', error);
  //   //   }
  //   // });
  // }

  public addAgendaToMeeting(meetingId: number, agenda: Agenda): void {
    const meetings = this.meetingsSubject.value;
    const index = meetings.findIndex(m => m.id === meetingId);
    if (index !== -1) {
      const updatedMeetings = [...meetings];
      updatedMeetings[index].agenda = agenda;
      this.meetingsSubject.next(updatedMeetings);
      console.log('Updated meeting with new agenda:', updatedMeetings[index]);
    } else {
      console.error('Meeting not found with ID:', meetingId);
    }
  }
}

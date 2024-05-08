import { Component, OnInit } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddMeetingComponent} from "src/app/add-meeting/add-meeting.component";
import {Meeting} from "src/app/_models/meeting.model";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {User} from "src/app/_models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // bsModalRef: BsModalRef | undefined;

  public meetings: Meeting[] = [];
  user: User;

  constructor(private meetingListService:MeetingListService, private authenticationService: AuthenticationService) {
    this.user = authenticationService.userValue;
  }

  ngOnInit(): void {
    this.meetingListService.getMeetings().subscribe(meetings => {
      console.log("checking meetings in dashboard");
      console.log(meetings);

      if (this.user.role == 'admin') {
        this.meetings = meetings;
      } else {
        this.meetings = this.filterMeetingsByAttendeeId(meetings, this.user.id);
      }
    });
  }

  filterMeetingsByAttendeeId(meetings, attendeeId) {
    return meetings.filter(meeting =>
      meeting.attendees.some(attendee => attendee.id === attendeeId)
    );
  }

  addMeeting() {
    // this.bsModalRef = this.modalService.show(AddMeetingComponent);
  }



}

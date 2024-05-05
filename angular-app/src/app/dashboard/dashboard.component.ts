import { Component, OnInit } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddMeetingComponent} from "src/app/add-meeting/add-meeting.component";
import {Meeting} from "src/app/_models/meeting.model";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // bsModalRef: BsModalRef | undefined;

  public meetings: Meeting[] = [];

  constructor(private meetingListService:MeetingListService) { }

  ngOnInit(): void {
    this.meetingListService.getMeetings().subscribe(meetings => {
      console.log("checking meetings in dashboard");
      console.log(meetings);
      this.meetings = meetings;
    });
  }

  addMeeting() {
    // this.bsModalRef = this.modalService.show(AddMeetingComponent);
  }



}

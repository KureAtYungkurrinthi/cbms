import { Component, OnInit } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddMeetingComponent} from "src/app/add-meeting/add-meeting.component";
import {Meeting} from "src/app/meeting.model";
import {AuthenticationService} from "src/app/_services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // bsModalRef: BsModalRef | undefined;



  meetings: Meeting[] = [
    {
      id: 1,
      title: 'Quarterly Planning',
      date: '2024-03-11',
      time: '10:00 AM',
      room: 'Visionary Room A'
    },
    {
      id: 2,
      title: 'Marketing Strategy',
      date: '2024-03-14',
      time: '09:30 AM',
      room: 'Visionary Room C'
    },
    {
      id: 3,
      title: 'Product Launch',
      date: '2024-03-20',
      time: '02:30 PM',
      room: 'Board Room A'
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  addMeeting() {
    // this.bsModalRef = this.modalService.show(AddMeetingComponent);
  }



}

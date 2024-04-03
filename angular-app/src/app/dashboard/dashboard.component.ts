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

  currentDate: string | undefined;
  currentTime: string | undefined;

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

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.updateDateTime();
    // Update the time every minute to keep it current
    setInterval(() => this.updateDateTime(), 60000);
  }

  addMeeting() {
    // this.bsModalRef = this.modalService.show(AddMeetingComponent);
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}

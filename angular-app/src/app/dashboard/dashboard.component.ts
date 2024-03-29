import { Component, OnInit } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddMeetingComponent} from "src/app/add-meeting/add-meeting.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // bsModalRef: BsModalRef | undefined;

  currentDate: string | undefined;
  currentTime: string | undefined;

  constructor() { }

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
}

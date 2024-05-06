import { Component, OnInit } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {FormatUtil} from "src/app/_helpers/format.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  deleteMeetingModal: boolean = false;
  public meetings: Meeting[] = [];
    constructor(private meetingService:MeetingListService,
                private router: Router,
                ) { }

  ngOnInit(): void {
    this.meetingService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onPublish(id: number | undefined) {
  }

  onMakeAgenda(id: number | undefined) {
  }

  onSeeAgenda(id: number | undefined) {
  }

  openDeleteMeetingModal() {
    this.deleteMeetingModal = true;
  }

  closeDeleteMeetingModal() {
    this.deleteMeetingModal= false;
  }

  confirmDeleteMeeting(meetingId: number) {
      this.meetingService.deleteMeeting(meetingId);
      this.closeDeleteMeetingModal();
    // this.router.navigate(['/meeting']);
  }

  protected readonly FormatUtil = FormatUtil;
}

import { Component, OnInit } from '@angular/core';
import {MeetingList} from "src/app/_models/meeting-list";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  public meetings: MeetingList[] = [];
    constructor(private meetingListService:MeetingListService) { }

  ngOnInit(): void {
    this.meetingListService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onPublish(id: number | undefined) {
  }

  onMakeAgenda(id: number | undefined) {
  }

  onSeeAgenda(id: number | undefined) {
  }
}

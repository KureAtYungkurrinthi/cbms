import { Component, OnInit } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {FormatUtil} from "src/app/_helpers/format.util";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  public meetings: Meeting[] = [];
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

  protected readonly FormatUtil = FormatUtil;
}

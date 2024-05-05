import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {FormatUtil} from "src/app/_helpers/format.util";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css']
})
export class MeetingCardComponent implements OnInit {
  @Input() meeting!: Meeting;

  constructor() { }

  ngOnInit(): void {
  }


  protected readonly FormatUtil = FormatUtil;
  protected readonly formatDate = formatDate;
}

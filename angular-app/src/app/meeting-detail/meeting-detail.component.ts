import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  meetingId: number | null = null;
  meeting: Meeting | undefined;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingListService
    ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.meetingId = parseInt(idParam, 10);

      this.meeting = this.meetingService.getMeetingById(this.meetingId);
    }
  }

  publishMeeting() {
  }

  makeAgenda() {
  }

  saveNotes() {
  }

  cancelChanges() {
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmAction() {
    this.closeModal();
    console.log('Action confirmed!');
  }

}

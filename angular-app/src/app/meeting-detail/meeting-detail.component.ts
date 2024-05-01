import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {User} from "src/app/_models/user";

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {
  meetingId: number | null = null;
  meeting: Meeting | undefined;
  showModal: boolean = false;
  agendaModal: boolean = false;
  deleteAgendaModal: boolean = false;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingListService,
    private authenticationService: AuthenticationService
    ) {
    this.user = authenticationService.userValue;
  }

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

  openAgendaModal() {
    this.agendaModal = true;
  }

  closeAgendaModal() {
    this.agendaModal = false;
  }

  openDeleteAgendaModal() {
    this.deleteAgendaModal= true;
  }

  closeDeleteAgendaModal() {
    this.deleteAgendaModal= false;
  }

  downloadAgenda(selectedMeeting: any) {

  }

  editAgenda(selectedMeeting: any) {

  }

  deleteAgenda(selectedMeeting: any) {
    this.openDeleteAgendaModal();

  }

  confirmDeleteAgenda() {
    this.closeDeleteAgendaModal();
    this.closeAgendaModal();

    this.meetingService.deleteAgenda(this.meetingId);
  }
}

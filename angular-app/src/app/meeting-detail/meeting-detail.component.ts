import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {User} from "src/app/_models/user";
import {FormatUtil} from "src/app/_helpers/format.util";

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
  deleteMeetingModal: boolean = false;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingListService,
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
    this.user = authenticationService.userValue;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.meetingId = parseInt(idParam, 10);

    this.meetingService.getMeetingById(this.meetingId).subscribe(value => {
        this.meeting = value;
      });
      if (!this.meeting.agenda) {
        this.getAgenda();
      }
    }
  }

  getAgenda() {
    this.meetingService.getAgenda(this.meetingId).subscribe((agenda) => {
      this.meeting.agenda = agenda;
      console.log("checking agenda");
      console.log(this.meeting.agenda);
    });
  }

  publishMeeting() {
    this.meetingService.publishMeeting(this.meeting).subscribe((value) => {
      console.log("line 50 meeting-detail");
      console.log(value);
      this.openModal();
    });
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

  openDeleteMeetingModal() {
    this.deleteMeetingModal = true;
  }

  closeDeleteMeetingModal() {
    this.deleteMeetingModal= false;
  }

  downloadAgenda(meeting: any) {
    const jsPDF = window['jspdf'].jsPDF;  // Accessing jsPDF from the window object
    const doc = new jsPDF();

    // Optional: Set properties for the PDF document
    doc.setProperties({
      title: 'Meeting Agenda',
      subject: 'Agenda for ' + meeting.title,
      author: 'Kaung',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Kaung'
    });

    // Use the html method to capture the modal content
    const content = document.getElementById('toPrint');

    console.log(content);

    if (content) {
      doc.html(content, {
        html2canvas: {
          scale: 0.5,
          logging: true,
          useCORS: true,
          windowHeight: content.scrollHeight,
          windowWidth: content.scrollWidth
        },
        callback: function (doc) {
          doc.save('meeting-agenda.pdf');
        },
        x: 10,
        y: 10
      });
    }
  }

  editAgenda(selectedMeeting: any) {
    this.router.navigate(['/meeting/' + selectedMeeting.id + '/agenda/edit']);
  }

  deleteAgenda(selectedMeeting: any) {
    this.openDeleteAgendaModal();

  }

  confirmDeleteAgenda() {
    this.closeDeleteAgendaModal();
    this.closeAgendaModal();

    this.meetingService.deleteAgenda(this.meetingId);
  }

  confirmDeleteMeeting() {
    this.meetingService.deleteMeeting(this.meetingId);
    this.router.navigate(['/dashboard']);
  }

  protected readonly FormatUtil = FormatUtil;
}

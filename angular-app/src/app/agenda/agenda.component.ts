import { Component, OnInit } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Agenda} from "src/app/_models/agenda.model";
import { Location } from '@angular/common'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  meetingId: number | null = null;
  meeting: Meeting | undefined;
  showModal: boolean = false;
  // @ts-ignore
  agendaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingListService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.meetingId = parseInt(idParam, 10);

      this.meeting = this.meetingService.getMeetingById(this.meetingId);
    }

    this.agendaForm = this.formBuilder.group({
      welcomeDuration: ['', [Validators.required, Validators.min(1)]],
      welcomePresenter: ['', Validators.required],
      confirmAttendance: ['', Validators.required],
      purposeDuration: ['', [Validators.required, Validators.min(1)]],
      goalsAndObjectives2_1: ['', Validators.required],
      implementation2_2: ['', Validators.required],
      purposePresenter: ['', Validators.required],
      agendaDuration: ['', [Validators.required, Validators.min(1)]],
      previousMeetingReview3_1: ['', Validators.required],
      actionTaken3_2: ['', Validators.required],
      agendaPresenter: ['', Validators.required],
      closingDuration: ['', [Validators.required, Validators.min(1)]],
      note: [''],
      closingPresenter: ['', Validators.required]
    });
  }



  openModal() {
    this.showModal = true;
  }

  backToHome() {

  }

  backToMeetingList() {

  }

  closeModal() {
    this.showModal = false;
    this.location.back();
  }

  submitAgenda() {
    console.log("submitted");
    if (this.agendaForm
      && this.agendaForm.valid
    ) {
      console.log(this.agendaForm.value);
      const agendaData: Agenda = this.agendaForm.value as Agenda;
      this.meetingService.addAgendaToMeeting(this.meetingId, agendaData);
      this.openModal();
    }
  }
  //
  // get welcomeDuration() {
  //   return this.agendaForm.get('welcomeDuration');
  // }

  goBack() {
    this.location.back();
  }
}

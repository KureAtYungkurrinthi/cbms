import { Component, OnInit } from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Agenda} from "src/app/_models/agenda.model";
import { Location } from '@angular/common'
import {UserService} from "src/app/_services/user.service";
import { User } from '../_models/user';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  meetingId: number | null = null;
  meeting: Meeting | undefined;
  showModal: boolean = false;
  users: User[];
  // @ts-ignore
  agendaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingListService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.meetingId = parseInt(idParam, 10);

    this.meetingService.getMeetingById(this.meetingId).subscribe((meeting) => {
        this.meeting = meeting;
      })
    }

    // this.userService.getAll().subscribe(value => this.users = value);

    this.users = this.meeting.attendees;
    // .map(attendee => {
    //   return {
    //     id: attendee.id,
    //     name: attendee.name,
    //     email: attendee.email,
    //   };
    // });

    if (this.meeting.agenda) {
      let agenda = this.meeting.agenda;
      const welcomePresenter = this.users.find(user => user.id === agenda.welcomePresenter.id);
      const purposePresenter = this.users.find(user => user.id === agenda.purposePresenter.id);
      const agendaPresenter = this.users.find(user => user.id === agenda.agendaPresenter.id);
      const closingPresenter = this.users.find(user => user.id === agenda.closingPresenter.id);

      this.agendaForm = this.formBuilder.group({
        welcomeDuration: [agenda.welcomeDuration, [Validators.required, Validators.min(1)]],
        welcomePresenter: [welcomePresenter, Validators.required],
        confirmAttendance: [this.meeting.attendees, Validators.required],
        purposeDuration: [agenda.purposeDuration, [Validators.required, Validators.min(1)]],
        goalsAndObjectives2_1: [agenda.goalsAndObjectives2_1, Validators.required],
        implementation2_2: [agenda.implementation2_2, Validators.required],
        purposePresenter: [purposePresenter, Validators.required],
        agendaDuration: [agenda.agendaDuration, [Validators.required, Validators.min(1)]],
        previousMeetingReview3_1: [agenda.previousMeetingReview3_1, Validators.required],
        actionTaken3_2: [agenda.actionTaken3_2, Validators.required],
        agendaPresenter: [agendaPresenter, Validators.required],
        closingDuration: [agenda.closingDuration, [Validators.required, Validators.min(1)]],
        note: [agenda.notes],
        closingPresenter: [closingPresenter, Validators.required]
      });
    } else {
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
      // && this.agendaForm.valid
    ) {

      if (this.meeting.agenda) {
        console.log("updating agenda");
        const agendaData: Agenda = this.agendaForm.value as Agenda;
        this.meetingService.updateAgendaToMeeting(this.meetingId, agendaData);
        this.openModal();

      } else {
        console.log("creating agenda");
        console.log(this.agendaForm.value);
        const agendaData: Agenda = this.agendaForm.value as Agenda;
        this.meetingService.addAgendaToMeeting(this.meetingId, agendaData);
        this.openModal();
      }

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

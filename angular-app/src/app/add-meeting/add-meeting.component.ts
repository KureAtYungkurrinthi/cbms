import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {User} from "src/app/_models/user";
import {Room} from "src/app/_models/room.model";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  public meetingForm: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Input() users!: User[];
  @Input() rooms!: Room[];

  constructor(private fb: FormBuilder,private meetingListService :MeetingListService) {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      room: '',
      attendees: '',
      notes: '',
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      room: '',
      attendees: '',
      notes: '',
    });
  }

  onSubmit() {
    if (this.meetingForm) {

      var meeting = this.meetingForm.value as Meeting
      console.log(meeting);
      this.meetingListService.pushMeeting(meeting);
      this.createForm();
    }

    // when successful
    this.closeModal.emit();
  }

  closeMeetingModal() {
    this.closeModal.emit();
  }

  onSelect($event: Event) {
    console.log($event);
  }
}

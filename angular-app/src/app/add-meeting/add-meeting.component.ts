import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  public meetingForm: FormGroup;
  @Output() closeModal = new EventEmitter<void>();

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

}

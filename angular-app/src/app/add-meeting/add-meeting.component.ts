import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  public meetingForm: FormGroup;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      time: '',
      room: ''
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      time: '',
      room: ''
    });
  }

  onSubmit() {
    if (this.meetingForm) {
      console.log(this.meetingForm.value);
    }
  }

  closeMeetingModal() {
    this.closeModal.emit();
  }

}

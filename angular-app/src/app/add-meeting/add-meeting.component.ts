import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {User} from "src/app/_models/user";
import {Room} from "src/app/_models/room.model";
import {FormatUtil} from "src/app/_helpers/format.util";
import {Subject} from "rxjs";

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
  public currentMeeting?: Meeting;
  @Input() meetingToEdit?: Subject<Meeting>;

  constructor(private fb: FormBuilder,private meetingListService :MeetingListService) {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      room: null,
      attendees: <User>[],
      notes: '',
    });
  }

  ngOnInit(): void {

    this.meetingToEdit.subscribe(meeting => {
      this.currentMeeting = meeting;
      if (this.currentMeeting) {
        console.log('editing meeting ');
        console.log(this.currentMeeting);
        this.populateForm(this.currentMeeting);
      }
    });

  }

  createForm() {
    this.meetingForm = this.fb.group({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      room: null,
      attendees: <User>[],
      notes: '',
    });
  }

  compareFn(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  populateForm(meeting: Meeting) {
    console.log(meeting.attendees);
    this.meetingForm.setValue({
      title: meeting.title,
      date: meeting.startTime.split('T')[0],
      startTime: meeting.startTime.split('T')[1].substring(0, 5),
      endTime: meeting.endTime.split('T')[1].substring(0, 5),
      room: this.rooms.find(room => room.id === meeting.room.id),
      // attendees: meeting.attendees,
      attendees: this.users.filter(user => meeting.attendees.some(att => att.id === user.id)),
      notes: meeting.notes
    });
  }

  onSubmit() {
    if (this.meetingForm) {

      let meeting = this.meetingForm.value as Meeting
      console.log(meeting);
      console.log(meeting.date);
      meeting.startTime = FormatUtil.createTimeStamp(meeting.date, meeting.startTime);
      meeting.endTime = FormatUtil.createTimeStamp(meeting.date, meeting.endTime);
      meeting.roomId = meeting.room.id;
      console.log("tuning for add meeting");
      if(this.currentMeeting) {
        meeting.id = this.currentMeeting.id;
        console.log("in updating, ", meeting);
        this.meetingListService.updateMeeting(meeting);
      } else {
        console.log("in creating");
        this.meetingListService.addMeeting(meeting);
      }
      this.createForm();
    }

    // when successful
    this.closeModal.emit();
  }

  closeMeetingModal() {
    this.closeModal.emit();
  }


}

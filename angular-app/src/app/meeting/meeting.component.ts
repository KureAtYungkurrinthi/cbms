import {Component, OnInit, ViewChild} from '@angular/core';
import {Meeting} from "src/app/_models/meeting.model";
import {MeetingListService} from "src/app/_services/meeting-list/meeting-list.service";
import {FormatUtil} from "src/app/_helpers/format.util";
import {Router} from "@angular/router";
import {User} from "src/app/_models/user";
import {Room} from "src/app/_models/room.model";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {UserService} from "src/app/_services/user.service";
import {RoomService} from "src/app/_services/room.service";
import {AddMeetingComponent} from "src/app/add-meeting/add-meeting.component";
import {Subject} from "rxjs";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  deleteMeetingModal: boolean = false;
  public meetings: Meeting[] = [];
  public users: User[]  = [];
  public rooms: Room[]  = [];
  public meetingToEdit: Meeting = null;

  public meetingToEdit$: Subject<Meeting> = new Subject();

  @ViewChild('meetingModal') meetingModal: any;
  showModal: boolean = false;
    constructor(private meetingService:MeetingListService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private roomService: RoomService,
                private router: Router,
                ) { }

  ngOnInit(): void {
    this.meetingService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });

    this.authenticationService.userObservable.subscribe(
      value => {
        this.userService.getAll().subscribe( value => {
          this.users = value;
          for (const user of value) {
            console.log(user); // Log each item
          }
        });

        this.roomService.getAll().subscribe( value => {
          this.rooms = value;
          console.log("checking  rooms");
          for (const room of value) {
            console.log(room); // Log each item
          }
        })

      }
    );
  }

  onPublish(id: number | undefined) {
  }

  onMakeAgenda(id: number | undefined) {
  }

  onSeeAgenda(id: number | undefined) {
  }

  openDeleteMeetingModal() {
    this.deleteMeetingModal = true;
  }

  closeDeleteMeetingModal() {
    this.deleteMeetingModal= false;
  }

  confirmDeleteMeeting(meetingId: number) {
      this.meetingService.deleteMeeting(meetingId);
      this.closeDeleteMeetingModal();
    // this.router.navigate(['/meeting']);
  }

  openMeetingModalFromApp(meeting: Meeting) {
    console.log("model open");
    this.meetingModal.nativeElement.style.display = 'block';
    this.meetingModal.nativeElement.className += ' show';
    this.showModal = true;
    this.meetingToEdit = meeting;
    this.meetingToEdit$.next(meeting);
  }

  closeMeetingModalFromApp() {
    this.meetingModal.nativeElement.style.display = 'none';
    this.meetingModal.nativeElement.classList.remove('show');
    this.showModal = false;
  }

  protected readonly FormatUtil = FormatUtil;
}

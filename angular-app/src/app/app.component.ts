import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "src/app/_models/user";
import {AuthenticationService} from "src/app/_services/authentication.service";
import {UserService} from "src/app/_services/user.service";
import {RoomService} from "src/app/_services/room.service";
import {Room} from "src/app/_models/room.model";
// import { HomeComponent } from './home/home.component';
// import { PostComponent} from "src/app/post/post.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Testing';
  public loginUser: User | null | undefined;
  public users: User[]  = [];
  public rooms: Room[]  = [];
  showModal: boolean = false;
  @ViewChild('meetingModal') meetingModal: any;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private roomService: RoomService,
              ) {
    authenticationService.userObservable.subscribe(
      value => {
        this.loginUser=value;
        console.log("checking users ");
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

  openMeetingModalFromApp() {
    console.log("model open");
    this.meetingModal.nativeElement.style.display = 'block';
    this.meetingModal.nativeElement.className += ' show';
    this.showModal = true;
  }

  closeMeetingModalFromApp() {
    this.meetingModal.nativeElement.style.display = 'none';
    this.meetingModal.nativeElement.classList.remove('show');
    this.showModal = false;
  }

}

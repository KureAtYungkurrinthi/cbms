import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "src/app/_models/user";
import {AuthenticationService} from "src/app/_services/authentication.service";
// import { HomeComponent } from './home/home.component';
// import { PostComponent} from "src/app/post/post.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Testing';
  public user: User | null | undefined;
  showModal: boolean = false;
  @ViewChild('meetingModal') meetingModal: any;

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.userObservable.subscribe(
      value => this.user=value
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

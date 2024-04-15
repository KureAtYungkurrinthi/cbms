import { Component } from '@angular/core';
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

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.userObservable.subscribe(
      value => this.user=value
    );
  }

}

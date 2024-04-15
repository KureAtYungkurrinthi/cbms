import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "src/app/_services/authentication.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  currentDate: string | undefined;
  currentTime: string | undefined;
  @Output() openModal = new EventEmitter<void>();


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.updateDateTime();
    // Update the time every minute to keep it current
    setInterval(() => this.updateDateTime(), 60000);
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  openMeetingModal() {
    this.openModal.emit();
  }


}

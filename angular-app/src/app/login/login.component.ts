import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    // login logic

    // If login is successful, navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }

}

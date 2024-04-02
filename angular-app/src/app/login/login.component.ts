import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "src/app/_services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    // event.preventDefault();
    // login logic

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    console.log(this.f['username'].value);
    console.log(this.f['password'].value);
    this.authenticationService.login(this.f['username'].value, this.f['password'].value)
      // .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          console.log("testing");
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });

    // // If login is successful, navigate to the dashboard
    // this.router.navigate(['/dashboard']);
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingCardComponent } from './meeting-card/meeting-card.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'meeting', component: MeetingComponent},
  {path: 'meeting/:id', component: MeetingDetailComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    DashboardComponent,
    AddMeetingComponent,
    MeetingCardComponent,
    CalendarComponent,
    SidemenuComponent,
    MeetingComponent,
    MeetingFormComponent,
    MeetingDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: false}  // <-- debugging purposes onl
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

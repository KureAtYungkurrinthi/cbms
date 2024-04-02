import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  firstDayOfMonth!: Date;
  emptyDays: number[] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calculate empty days
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)
    this.emptyDays = Array(firstDayOfWeek).fill(null); // Create an array for empty days

    // Fill the days in month
    this.daysInMonth = [];
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      this.daysInMonth.push(new Date(year, month, day));
    }
  }

}

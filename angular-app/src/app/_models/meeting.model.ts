import {User} from "src/app/_models/user";

export class Meeting {
  id?: number;
  title?: string;
  date?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  // attendees?: User[];
  attendees?: string;
  room?: string;


  constructor(id: number, title: string, date: string, time: string, startTime: string, endTime: string, attendees: string, room: string) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.startTime = startTime;
    this.endTime = endTime;
    this.attendees = attendees;
    this.room = room;
  }
}

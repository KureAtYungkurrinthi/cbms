import {User} from "src/app/_models/user";
import {Agenda} from "src/app/_models/agenda.model";

// export class Meeting {
//   id?: number;
//   title?: string;
//   date?: string;
//   time?: string;
//   startTime?: string;
//   endTime?: string;
//   // attendees?: User[];
//   attendees?: string;
//   room?: string;
//   note?: string;
//   agenda?: Agenda;
//
//
//   constructor(id: number, title: string, date: string, time: string, startTime: string, endTime: string, attendees: string, room: string, note:string = "", agenda?:Agenda) {
//     this.id = id;
//     this.title = title;
//     this.date = date;
//     this.time = time;
//     this.startTime = startTime;
//     this.endTime = endTime;
//     this.attendees = attendees;
//     this.room = room;
//     this.note = note;
//     this.agenda = agenda;
//   }
// }

export class Meeting {
  constructor(
    public id: number,
    public title: string,
    public date: string,
    public time: string,
    public room: string,
    public note: string,
    public attendees: string,
    public startTime?: string,
    public endTime?: string,
    public agenda?: Agenda  // Optional property to hold an Agenda
  ) {}
}

export class Meeting {
  id?: number;
  title?: string;
  date?: string;
  time?: string;
  location?: string;

  constructor(
    id: number,
    title: string,
    date: string,
    time: string,
    location: string
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.location = location;
  }
}

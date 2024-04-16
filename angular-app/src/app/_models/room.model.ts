export class Room {
  id: number;
  name: string;
  location: string;
  capacity: number;

  constructor(id: number, name: string, location: string, capacity: number) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.capacity = capacity;
  }
}

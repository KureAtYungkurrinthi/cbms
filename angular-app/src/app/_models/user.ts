﻿export class User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    token?: string;
    Attendee?: Attendee;
}

export class Attendee {
  isPresenter?: boolean;
}

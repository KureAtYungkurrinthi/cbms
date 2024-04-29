export class Agenda {
  id?: number;
  welcomeDuration?: number;
  welcomePresenter?: string;
  confirmAttendance?: string;
  purposeDuration?: number;
  goalsAndObjectives2_1?: string;
  implementation2_2?: string;
  purposePresenter?: string;
  agendaDuration?: number;
  previousMeetingReview3_1?: string;
  actionTaken3_2?: string;
  agendaPresenter?: string;
  closingDuration?: number;
  note?: string;
  closingPresenter?: number;


  constructor(
    id: number,
    welcomeDuration: number,
    welcomePresenter: string,
    confirmAttendance: string,
    purposeDuration: number,
    goalsAndObjectives2_1: string,
    implementation2_2: string,
    purposePresenter: string,
    agendaDuration: number,
    previousMeetingReview3_1: string,
    actionTaken3_2: string,
    agendaPresenter: string,
    closingDuration: number,
    note: string,
    closingPresenter: number) {
    this.id = id;
    this.welcomeDuration = welcomeDuration;
    this.welcomePresenter = welcomePresenter;
    this.confirmAttendance = confirmAttendance;
    this.purposeDuration = purposeDuration;
    this.goalsAndObjectives2_1 = goalsAndObjectives2_1;
    this.implementation2_2 = implementation2_2;
    this.purposePresenter = purposePresenter;
    this.agendaDuration = agendaDuration;
    this.previousMeetingReview3_1 = previousMeetingReview3_1;
    this.actionTaken3_2 = actionTaken3_2;
    this.agendaPresenter = agendaPresenter;
    this.closingDuration = closingDuration;
    this.note = note;
    this.closingPresenter = closingPresenter;
  }
}

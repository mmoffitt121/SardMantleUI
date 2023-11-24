import { Component, ViewChild } from '@angular/core';
import { Calendar, Formatter, Month, TimeUnit, TimeZone, Weekday } from 'src/app/models/units/calendar';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public pageMode: string = "calendars";
  public pageName: string = "Calendars";

  public calendar: Calendar | undefined;
  public editing = false;
  public adding = false;

  public setPageMode(mode: string, name: string) {
    this.pageMode = mode;
    this.pageName = name;
  }

  public doAdd() {
    this.editing = true;
    this.calendar = {
      name: "",
      summary: "",
      unitTimePerDay: 3600,
      months: [] as Month[],
      timeUnits: [] as TimeUnit[],
      eras: [] as TimeUnit[],
      timeZones: [] as TimeZone[],
      formatters: [] as Formatter[],
      weekdays: [] as Weekday[],
    } as Calendar
  }

  public cancelEdit(backToList: boolean) {
    this.editing = false; 
    if (!this.calendar?.id || backToList) {
      this.calendar = undefined;
    } 
  }

  public selectCalendar(event: any) {
    this.calendar = event;
  }

  public editCalendar() {
    this.editing = true;
  }

  constructor(public loginService: LoginService) {}
}

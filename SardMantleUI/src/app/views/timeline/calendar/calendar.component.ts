import { Component } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';
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
  public editing = false;;

  public setPageMode(mode: string, name: string) {
    this.pageMode = mode;
    this.pageName = name;
  }

  public doAdd() {
    
  }

  public selectCalendar(event: any) {
    this.calendar = event;
  }

  public editCalendar() {
    this.editing = true;
  }

  constructor(public loginService: LoginService) {}
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calendar } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {
  public calendar: Calendar
  public dateTime: bigint;
  public displayMode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private calendarService: CalendarService) {
    this.calendar = data.calendar;
    this.dateTime = data.dateTime ?? BigInt(1000*60*60*24*10*30);
    this.displayMode = data.displayMode ?? "day";
    console.log(this.calendar)
    console.log(this.calendarService.toDateTimeObject(this.dateTime, this.calendar));
  }
}

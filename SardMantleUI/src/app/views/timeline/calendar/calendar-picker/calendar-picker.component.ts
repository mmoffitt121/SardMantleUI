import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  public select(date: bigint) {
    this.dialogRef.close(date);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CalendarPickerComponent>, private calendarService: CalendarService) {
    this.calendar = data.calendar;
    this.dateTime = data.dateTime ?? 0n;
    this.displayMode = data.displayMode ?? "day";
  }
}

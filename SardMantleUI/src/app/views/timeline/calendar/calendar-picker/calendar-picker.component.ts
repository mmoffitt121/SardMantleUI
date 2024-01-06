import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Calendar, Formatter, TimeZone } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { EditDataPointComponent } from 'src/app/views/shared/document-components/edit/edit-data-point/edit-data-point.component';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent implements OnInit {
  @Input() calendar: Calendar;
  @Input() format: Formatter;
  @Input() timeZone: TimeZone;
  public dateTime: bigint;
  public displayMode: string;
  public displayValue: string;

  public select(date: bigint) {
    this.refreshView();
    this.dialogRef.close(date);
  }

  public refreshView() {
    this.displayValue = this.calendarService.format(this.dateTime, this.calendar);
  }

  public handleSetOptions(options: any) {
    this.displayMode = "day";
    if (options) {
      console.log(options)
      this.calendar = options.calendar;
      this.format = options.formatter;
      this.timeZone = options.timeZone;
      this.refreshView();
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CalendarPickerComponent>, private calendarService: CalendarService) {
    this.calendar = data.calendar;
    this.format = data.formatter;
    this.timeZone = data.timeZone;
    this.dateTime = data.dateTime ?? 0n;
    this.displayMode = data.displayMode ?? "day";
  }

  ngOnInit(): void {
    this.calendar = this.calendar ?? this.calendarService.selectedCalendar;
    this.format = this.format ?? this.calendarService.selectedFormatter;
    this.timeZone = this.timeZone ?? this.calendarService.selectedTimeZone;
    this.refreshView();
  }
}

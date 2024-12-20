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
  @Input() useBaseYear: boolean;
  @Input() editTime: boolean;
  public dateTime: bigint;
  public displayMode: string;
  public displayValue: string;

  public eraToChange: number;
  public eraToChangeTime: bigint;

  public select(date: bigint | undefined) {
    if (date != undefined) {
      this.calendarService.saveDefaultDate(date);
    }
    this.refreshView();
    let result = {
      dateTime: date,
      calendar: this.calendar,
      format: this.format,
      timeZone: this.timeZone
    }
    this.dialogRef.close(result);
  }

  public refreshView() {
    let dto = this.calendarService.toDateTimeObject(this.dateTime, this.calendar);
    this.displayValue = this.useBaseYear ? 
      this.calendar.months[dto.month - 1].name + " " + dto.day + ", " + dto.year : 
      this.calendarService.format(this.dateTime, this.calendar, this.format);
  }

  public handleSetOptions(options: any) {
    this.displayMode = "day";
    if (options) {
      this.calendar = options.calendar;
      this.format = options.formatter;
      this.timeZone = options.timeZone;
      this.refreshView();
      if (options.close) {
        this.dialogRef.close({
          calendar: this.calendar,
          format: this.format,
          timeZone: this.timeZone
        })
      }
    }
  }

  public changeEra(eraIndex: number) {
    this.eraToChange = eraIndex;
    this.displayMode = 'era';
    this.eraToChangeTime = this.dateTime;
  }

  public clear() {
    this.select(undefined);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CalendarPickerComponent>, private calendarService: CalendarService) {
    this.calendar = data.calendar;
    this.format = data.formatter;
    this.timeZone = data.timeZone;
    this.dateTime = data.dateTime ?? calendarService.getDefaultDate();
    this.displayMode = data.displayMode ?? "day";
    this.useBaseYear = data.useBaseYear ?? false;
    this.editTime = data.editTime ?? true;
  }

  ngOnInit(): void {
    this.calendar = this.calendar ?? this.calendarService.selectedCalendar;
    this.format = this.format ?? this.calendarService.selectedFormatter;
    this.timeZone = this.timeZone ?? this.calendarService.selectedTimeZone;
    this.refreshView();
  }
}

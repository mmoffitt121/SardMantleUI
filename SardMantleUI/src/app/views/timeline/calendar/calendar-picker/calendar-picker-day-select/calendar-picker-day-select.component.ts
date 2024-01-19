import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimeObject } from 'src/app/models/timeline/time';
import { Calendar, Week, Weekday } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-picker-day-select',
  templateUrl: './calendar-picker-day-select.component.html',
  styleUrls: ['./calendar-picker-day-select.component.scss']
})
export class CalendarPickerDaySelectComponent implements OnInit {
  @Input() public calendar: Calendar;
  @Input() public time: bigint = 0n;
  @Input() useBaseYear: boolean;
  @Output() public timeChange = new EventEmitter<bigint>();
  @Output() public changeMonth = new EventEmitter();
  @Output() public select = new EventEmitter<bigint>();
  @Output() public changeEra = new EventEmitter();
  @Output() public changeYear = new EventEmitter();

  public weekdays: Weekday[] = [];
  public weeks: Week[] = [];
  public dateTimeObject: DateTimeObject;

  public setCalendar(calendar: Calendar, time: bigint) {
    this.time = time;
    this.calendar = calendar;
    this.weekdays = calendar.weekdays;
    this.dateTimeObject = this.calendarService.toDateTimeObject(time, calendar);
    this.weeks = this.calendarService.getWeeksInMonth(time, calendar);
    this.timeChange.emit(time);
  }

  public scrubMonth(amount: number) {
    if (this.dateTimeObject.year == 0n && this.dateTimeObject.month == 1 && amount < 0) return; 
    this.setCalendar(this.calendar, this.calendarService.addMonths(amount, this.time, this.calendar));
  }

  public onSelect(day: DateTimeObject) {
    this.time = this.calendarService.fromDateTimeObject(day, this.calendar);
    this.timeChange.emit(this.time);
    this.select.emit(this.time);
  }

  constructor (private calendarService: CalendarService) {}

  ngOnInit(): void {
    console.log(this.useBaseYear)
    this.setCalendar(this.calendar, this.time);
  }
}

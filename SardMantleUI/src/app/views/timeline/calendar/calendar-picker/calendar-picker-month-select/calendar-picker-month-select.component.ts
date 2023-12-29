import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar, Month } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-picker-month-select',
  templateUrl: './calendar-picker-month-select.component.html',
  styleUrls: ['./calendar-picker-month-select.component.scss']
})
export class CalendarPickerMonthSelectComponent {
  @Input() public calendar: Calendar;
  @Input() public time: bigint = 0n;
  @Output() public timeChange = new EventEmitter<bigint>();
  @Output() public done = new EventEmitter();

  public selectMonth(month: number) {
    this.time = this.calendarService.setMonth(month, this.time, this.calendar);
    this.timeChange.emit(this.time);
    this.done.emit();
  }

  constructor (private calendarService: CalendarService) {} 
}

import { Component, Input } from '@angular/core';
import { Calendar, Formatter } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-view-datetime',
  templateUrl: './view-datetime.component.html',
  styleUrls: ['./view-datetime.component.scss']
})
export class ViewDatetimeComponent {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  public calendar: Calendar;
  public formatter: Formatter;

  @Input() value: bigint;
  public formattedValue: string;

  public setValue(value: string | bigint) {
    if (value == undefined) return;
    this.value = BigInt(value);

    this.formattedValue = this.calendarService.format(this.value, this.calendar, this.formatter);
  }

  constructor(private calendarService: CalendarService) {}
}

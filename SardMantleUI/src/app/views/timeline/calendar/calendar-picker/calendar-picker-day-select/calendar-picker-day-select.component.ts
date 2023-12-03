import { Component, Input } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-picker-day-select',
  templateUrl: './calendar-picker-day-select.component.html',
  styleUrls: ['./calendar-picker-day-select.component.scss']
})
export class CalendarPickerDaySelectComponent {
  @Input() public calendar: Calendar;
}

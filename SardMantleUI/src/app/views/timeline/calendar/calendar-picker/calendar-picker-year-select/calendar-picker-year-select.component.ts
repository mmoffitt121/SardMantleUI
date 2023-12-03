import { Component, Input } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-picker-year-select',
  templateUrl: './calendar-picker-year-select.component.html',
  styleUrls: ['./calendar-picker-year-select.component.scss']
})
export class CalendarPickerYearSelectComponent {
  @Input() public calendar: Calendar;
}

import { Component, Input } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-picker-era-view',
  templateUrl: './calendar-picker-era-view.component.html',
  styleUrls: ['./calendar-picker-era-view.component.scss']
})
export class CalendarPickerEraViewComponent {
  @Input() public calendar: Calendar;
}

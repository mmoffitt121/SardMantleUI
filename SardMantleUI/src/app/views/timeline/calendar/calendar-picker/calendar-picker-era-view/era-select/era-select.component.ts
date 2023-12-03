import { Component, Input } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-era-select',
  templateUrl: './era-select.component.html',
  styleUrls: ['./era-select.component.scss']
})
export class EraSelectComponent {
  @Input() public calendar: Calendar;
}

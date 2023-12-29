import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-edit-datetime',
  templateUrl: './edit-datetime.component.html',
  styleUrls: ['./edit-datetime.component.scss']
})
export class EditDatetimeComponent {
  @Input() public calendar: Calendar;
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';

  @Input() model: bigint;
  @Output() modelChange = new EventEmitter<bigint>();

  @Input() formatterIndex = 0;

  public modelChanged(event: any) {
    this.model = event;
    this.modelChange.emit(event);
  }

  constructor(public calendarService: CalendarService) {}
}

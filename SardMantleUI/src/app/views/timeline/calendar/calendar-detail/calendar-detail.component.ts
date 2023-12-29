import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss']
})
export class CalendarDetailComponent {
  @Input() calendar: Calendar;
  @Output() cancel = new EventEmitter();
  @Output() edit = new EventEmitter();
  public testerModel = 0n;

  public onCancel() {
    this.cancel.emit();
  }

  public onEdit() {
    this.edit.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarPickerComponent } from '../calendar-picker.component';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-picker-button',
  templateUrl: './calendar-picker-button.component.html',
  styleUrls: ['./calendar-picker-button.component.scss']
})
export class CalendarPickerButtonComponent {
  @Input() calendar: Calendar;

  @Input() model: bigint;
  @Output() modelChange = new EventEmitter<bigint>();

  public open() {
    const dialogRef = this.dialog.open(CalendarPickerComponent, {
      width: '500px',
      height: '600px',
      data: {
        calendar: this.calendar,
        dateTime: this.model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modelChange.emit(result === undefined ? this.model : result);
    });
  }

  constructor(private dialog: MatDialog) {

  }
}

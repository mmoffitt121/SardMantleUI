import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarPickerComponent } from '../calendar-picker.component';
import { Calendar, Formatter, TimeZone } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-calendar-picker-button',
  templateUrl: './calendar-picker-button.component.html',
  styleUrls: ['./calendar-picker-button.component.scss']
})
export class CalendarPickerButtonComponent {
  @Input() calendar: Calendar;
  @Input() formatter: Formatter;
  @Input() timeZone: TimeZone;
  @Input() useBaseYear: boolean;
  @Input() editTime: boolean;

  @Input() model: bigint | undefined;
  @Output() modelChange = new EventEmitter<bigint>();

  public open() {
    const dialogRef = this.dialog.open(CalendarPickerComponent, {
      width: '500px',
      height: '600px',
      data: {
        calendar: this.calendar,
        formatter: this.formatter,
        timeZone: this.timeZone,
        dateTime: this.model,
        useBaseYear: this.useBaseYear,
        editTime: this.editTime
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.model = result?.dateTime ?? this.model;
      this.calendar = result?.calendar ?? this.calendar;
      this.formatter = result?.format ?? this.formatter;
      this.timeZone = result?.timeZone ?? this.timeZone;

      if (result && result.dateTime == undefined) {
        this.model = undefined;
      }

      this.modelChange.emit({
        dateTime: this.model,
        calendar: this.calendar,
        formatter: this.formatter,
        timeZone: this.timeZone,
      } as any);
    });
  }

  constructor(private dialog: MatDialog) {

  }
}

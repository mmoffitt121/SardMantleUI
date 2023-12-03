import { Component, Input } from '@angular/core';
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

  public open() {
    const dialogRef = this.dialog.open(CalendarPickerComponent, {
      width: '500px',
      height: '600px',
      data: {
        calendar: this.calendar
      }
    });

    /*dialogRef.afterClosed().subscribe(result => {
      
    });*/
  }

  constructor(private dialog: MatDialog) {

  }
}

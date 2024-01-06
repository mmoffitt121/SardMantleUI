import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Calendar, EraDefinition } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-bar-timeline-list-view',
  templateUrl: './bar-timeline-list-view.component.html',
  styleUrls: ['./bar-timeline-list-view.component.scss']
})
export class BarTimelineListViewComponent {
  public calendar: Calendar;

  public found(def: EraDefinition) {
    this.dialogRef.close(def);
  }

  constructor(public dialogRef: MatDialogRef<BarTimelineListViewComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private calendarService: CalendarService) {
      this.calendar = data.calendar;
    }
}

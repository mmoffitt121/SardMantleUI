import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';
import { CalendarDataService } from 'src/app/services/calendar/calendar-data.service';
import { ErrorService } from 'src/app/services/error.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent {
  @Input() calendar: Calendar;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public onCancel() {
    this.cancel.emit();
  }

  public onSave() {
    this.calendar.timeUnits = this.calendar.timeUnits ?? [];
    this.calendar.months = this.calendar.months ?? [];
    this.calendar.weekdays = this.calendar.weekdays ?? [];
    this.calendar.eras = this.calendar.eras ?? [];
    this.calendar.formatters = this.calendar.formatters ?? [];
    this.calendar.timeZones = this.calendar.timeZones ?? [];

    this.calendarDataService.put(this.calendar).subscribe(result => {
      this.errorService.showSnackBar("Calendar " + this.calendar.name + " saved successfully.")
      this.save.emit(this.calendar);
    }, error => this.errorService.handle(error));
  }

  public add(toAdd: string) {
    switch (toAdd) {
      case "timeUnit":
      default:
        break;
    }
  }

  constructor(public skeletonService: SkeletonService, private calendarDataService: CalendarDataService, private errorService: ErrorService) {

  }
}

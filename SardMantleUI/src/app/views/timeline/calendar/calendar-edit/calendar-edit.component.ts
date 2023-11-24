import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calendar, Formatter, Month, TimeUnit, TimeZone, Weekday } from 'src/app/models/units/calendar';
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
    this.cancel.emit(false);
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

  public onDelete() {
    this.calendarDataService.delete(this.calendar.id).subscribe(result => {
      this.errorService.showSnackBar("Calendar " + this.calendar.name + " successfully deleted.");
      this.cancel.emit(true);
    }, error => this.errorService.handle(error));
  }

  public move(array: string, target: any, direction: string) {
    let arr: any = [];
    switch (array) {
      case "timeUnits":
        arr = this.calendar.timeUnits;
        break;
      case "weekdays":
        arr = this.calendar.weekdays;
        break;
      case "months":
        arr = this.calendar.months;
        break;
      case "eras":
        arr = this.calendar.eras;
        break;
      case "formatters":
        arr = this.calendar.formatters;
        break;
      case "timeZones":
        arr = this.calendar.timeZones;
        break;
    }
    
    let oldIndex = arr.indexOf(target);
    let newIndex = oldIndex + (direction == "down" ? 1 : -1);

    arr.splice(oldIndex, 1);
    arr.splice(newIndex, 0, target);
  }

  public add(toAdd: string) {
    switch (toAdd) {
      case "timeUnit":
        this.calendar.timeUnits.push({} as TimeUnit);
        break;
      case "weekday":
        this.calendar.weekdays.push({} as Weekday);
        break;
      case "month":
        this.calendar.months.push({} as Month);
        break;
      case "era":
        this.calendar.eras.push({} as TimeUnit);
        break;
      case "formatter":
        this.calendar.formatters.push({} as Formatter);
        break;
      case "timeZone":
        this.calendar.timeZones.push({} as TimeZone);
        break;
      default:
        break;
    }
  }

  constructor(public skeletonService: SkeletonService, private calendarDataService: CalendarDataService, private errorService: ErrorService) {

  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calendar, Era, Formatter, Month, TimeUnit, TimeZone, Weekday } from 'src/app/models/units/calendar';
import { CalendarDataService } from 'src/app/services/calendar/calendar-data.service';
import { ErrorService } from 'src/app/services/error.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { eraNavMenuItems } from 'src/app/models/navigation/card-nav-item';
import { MatDialog } from '@angular/material/dialog';
import { BarTimelineViewComponent } from '../../timeline-view/bar-timeline-view/bar-timeline-view.component';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent {
  @Input() calendar: Calendar;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public eraMenuItems = eraNavMenuItems;

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
    let newIndex = oldIndex + (direction === "down" ? 1 : -1);

    if (direction === "down" && oldIndex == arr.length) return; 
    if (direction === "up" && oldIndex == 0) return; 

    arr.splice(oldIndex, 1);
    arr.splice(newIndex, 0, target);
  }

  public deleteItem(array: string, target: any) {
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

    let index = arr.indexOf(target);
    arr.splice(index, 1);
  }

  public add(toAdd: string) {
    switch (toAdd) {
      case "timeUnit":
        this.calendar.timeUnits.push({id: this.generateId(this.calendar.timeUnits)} as TimeUnit);
        break;
      case "weekday":
        this.calendar.weekdays.push({} as Weekday);
        break;
      case "month":
        this.calendar.months.push({} as Month);
        break;
      case "era":
        this.calendar.eras.push({id: this.generateId(this.calendar.eras)} as Era);
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

  public handleCardAction(event: any, index: number) {
    switch (event) {
      case "view_timeline":
        this.viewEraTimeline(index);
        break;
    }
  }

  public viewEraTimeline(index: number) {
    const dialogRef = this.dialog.open(BarTimelineViewComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      data: {
        calendar: this.calendar,
        editingEras: true
      }
    });

    /*dialogRef.afterClosed().subscribe(result => {
      
    });*/
  }

  generateId(array: any[]) {
    let id = 1;
    let arr = [...array];
    arr.sort(item => item.id)
    for (let a of arr) {
      if (a.id == id) {
        id++;
      }
      else {
        break;
      }
    }
    return id;
  }

  constructor(public skeletonService: SkeletonService, private calendarDataService: CalendarDataService, private errorService: ErrorService, private dialog: MatDialog) {

  }
}

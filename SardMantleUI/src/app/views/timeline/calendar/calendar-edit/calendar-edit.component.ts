import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Calendar, Era, Formatter, Month, TimeUnit, TimeZone, Weekday } from 'src/app/models/units/calendar';
import { CalendarDataService } from 'src/app/services/calendar/calendar-data.service';
import { ErrorService } from 'src/app/services/error.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { eraNavMenuItems } from 'src/app/models/navigation/card-nav-item';
import { MatDialog } from '@angular/material/dialog';
import { BarTimelineViewComponent } from '../../timeline-view/bar-timeline-view/bar-timeline-view.component';
import { Problem } from 'src/app/models/shared/problem';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

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
  displayedColumns: string[] = ['name', 'formatter'];
  specialDisplayedColumns: string[] = ['name', 'formatter', 'description'];
  public defaultFormatters = [
    {name: "Day", formatter: "d"},
    {name: "Weekday Name", formatter: "W"},
    {name: "Weekday Abbr.", formatter: "w"},
    {name: "Month", formatter: "m"},
    {name: "Month Name", formatter: "M"},
    {name: "Year", formatter: "y"},
  ];
  public specialFormatters = [
    {name: "End", formatter: "$", description: "Will stop showing the formatted value when it reaches this point. Example: using the format \"dd\", the number 1234 will output \"1234\". However, \"dd$\" will output \"12\"."},
    //{name: "Escape", formatter: "\\", description: "Causes the next character to not act like a formatter, but instead appear in the result as normal."},
    {name: "String", formatter: "`", description: "Disables padding with zeroes on the proceeding string. Normally, \"80\" plugged into \"mmmm\" will become \"0080\". Plugged into \"mmmm`\", it will become \"80\""},
  ];

  public problems: Problem[] = [];
  private erasChanged: boolean = false;

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

    let i = 0;
    this.calendar.eras?.forEach(e => {
      e.eraDefinitions?.forEach(def => {def.id = i; i++;})
    })

    this.calendarService.applyEraDefinitionNumbers(this.calendar);

    if (!this.validate()) { return; }

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
        this.calendar.formatters.push({id: this.generateId(this.calendar.formatters)} as Formatter);
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

    dialogRef.afterClosed().subscribe(result => {
      this.erasChanged = true;
      this.validate();
    });
  }

  generateId(array: any[]) {
    const idSet = new Set();
    array.forEach(item => idSet.add(item.id));
    
    let id = 1;
    while (idSet.has(id)) {
      id++;
    }
    return id;
  }

  public validate() {
    let problems = [] as Problem[];
    let warnings = [] as Problem[];

    if (!this.calendar.name) { problems.push({message: "Calendar Info: Calendar Name cannot be blank."} as Problem); }
    if (this.calendar.unitTimePerDay == 0) { problems.push({message: "Calendar Info: Unit Time per Day cannot be blank or 0."} as Problem); }
    if (this.calendar.unitTimePerDay < 0) { problems.push({message: "Calendar Info: Unit Time per Day cannot be negative."} as Problem); }

    if (this.calendar.timeUnits.length < 1) { problems.push({message: "Clock Time: At least 1 clock time item is required."} as Problem); }
    this.calendar.timeUnits.forEach(u => {
      let itemName = u.name ? u.name : "Item " + (this.calendar.timeUnits.indexOf(u) + 1);
      let header = "Clock Time - " + itemName + ": "
      if (!u.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
      if (!u.formatter) { problems.push({message: header + "Formatter cannot be blank."} as Problem); }
      if (u.amountPerDerived == 0 || !u.amountPerDerived) { problems.push({message: header + "Derived field cannot be blank or 0."} as Problem); }
    });

    if (this.calendar.weekdays.length < 1) { problems.push({message: "Weekdays: At least 1 weekday is required."} as Problem); }
    this.calendar.weekdays.forEach(w => {
      let itemName = w.name ? w.name : "Item " + (this.calendar.weekdays.indexOf(w) + 1);
      let header = "Weekdays - " + itemName + ": "
      if (!w.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
    });

    if (this.calendar.months.length < 1) { problems.push({message: "Months: At least 1 month is required."} as Problem); }
    this.calendar.months.forEach(m => {
      let itemName = m.name ? m.name : "Item " + (this.calendar.months.indexOf(m) + 1);
      let header = "Months - " + itemName + ": "
      if (!m.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
      if (m.days == 0 || !m.days) { problems.push({message: header + "Days cannot be blank or 0."} as Problem); }
    });

    this.calendar.eras.forEach(e => {
      let itemName = e.name ? e.name : "Item " + (this.calendar.eras.indexOf(e) + 1);
      let header = "Eras - " + itemName + ": "
      if (!e.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
      if (!e.formatter) { problems.push({message: header + "Formatter cannot be blank."} as Problem); }
      if (!e.nameFormatter) { problems.push({message: header + "Name Formatter cannot be blank."} as Problem); }
    })

    if (this.calendar.formatters.length < 1) { problems.push({message: "Format: At least 1 format is required."} as Problem); }
    this.calendar.formatters.forEach(f => {
      let itemName = f.name ? f.name : "Item " + (this.calendar.formatters.indexOf(f) + 1);
      let header = "Format - " + itemName + ": "
      if (!f.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
      if (!f.formatter) { problems.push({message: header + "Formatter cannot be blank."} as Problem); }
    })

    this.calendar.timeZones.forEach(t => {
      let itemName = t.name ? t.name : "Item " + (this.calendar.timeZones.indexOf(t) + 1);
      let header = "Time Zone - " + itemName + ": "
      if (!t.name) { problems.push({message: header + "Name cannot be blank."} as Problem); }
      if (t.offset == 0 || !t.offset) { problems.push({message: header + "Offset cannot be blank or 0."} as Problem); }
      if (t.derivedTimeUnitId == 0 || !t.derivedTimeUnitId) { problems.push({message: header + "Time Unit cannot be blank or 0."} as Problem); }
    })

    if (this.erasChanged) { warnings.push({message: "Eras: Era definitions have been changed.", icon: "warning"} as Problem); }

    this.problems = problems.concat(warnings);
    return !(problems.length > 0);
  }

  constructor(
    public skeletonService: SkeletonService, 
    private calendarDataService: CalendarDataService, 
    private errorService: ErrorService, 
    private dialog: MatDialog,
    private calendarService: CalendarService) {

  }
}

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar, Formatter, TimeZone } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { EditDataPointComponent } from 'src/app/views/shared/document-components/edit/edit-data-point/edit-data-point.component';

@Component({
  selector: 'app-calendar-picker-options',
  templateUrl: './calendar-picker-options.component.html',
  styleUrls: ['./calendar-picker-options.component.scss']
})
export class CalendarPickerOptionsComponent implements AfterViewInit {
  @Input() calendars: Calendar[];
  public formatters: Formatter[];
  public timeZones: TimeZone[];
  @Input() inputCalendar: Calendar;
  public selectedCalendar: number;
  @Input() inputFormatter: Formatter;
  public selectedFormatter: number;
  @Input() inputTimeZone: TimeZone;
  public selectedTimezone: number;

  @ViewChild('editCalendar') editCalendar: EditDataPointComponent;
  @ViewChild('editFormat') editFormat: EditDataPointComponent;
  @ViewChild('editTimezone') editTimezone: EditDataPointComponent;

  @Output() done = new EventEmitter();

  public changeCalendar(calendar: Calendar) {
    this.formatters = calendar.formatters;
    this.timeZones = calendar.timeZones;
    this.selectedFormatter = 0;
    this.selectedTimezone = 0;
    this.editFormat.setModels(calendar.formatters, 0);
    this.editTimezone.setModels(calendar.timeZones, 0);
    this.selectedCalendar = this.calendars.indexOf(calendar);
  }

  public changeFormatter(formatter: Formatter) {
    this.selectedFormatter = this.formatters.indexOf(formatter);
  }

  public changeTimeZone(timeZone: TimeZone) {
    this.selectedTimezone = this.timeZones.indexOf(timeZone);
  }

  public onCancel() {
    this.done.emit(false);
  }

  public onApply() {
    this.done.emit({
      calendar: this.calendars[this.selectedCalendar], 
      formatter: this.formatters[this.selectedFormatter], 
      timeZone: this.timeZones[this.selectedTimezone]
    });
  }

  public onApplyAndClose() {
    this.done.emit({
      close: true,
      calendar: this.calendars[this.selectedCalendar], 
      formatter: this.formatters[this.selectedFormatter], 
      timeZone: this.timeZones[this.selectedTimezone]
    })
  }

  constructor (private calendarService: CalendarService, private cdref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.calendars = this.calendarService.calendars;
    if (this.inputCalendar) {
      this.editCalendar.setModels(this.calendars, this.calendars.indexOf(this.inputCalendar));
      this.changeCalendar(this.inputCalendar);
    }
    else if (this.calendars?.length) {
      this.editCalendar.setModels(this.calendars, 0);
      this.changeCalendar(this.calendars[0]);
    }
    this.editFormat.setModels(this.formatters, this.formatters.indexOf(this.inputFormatter));
    this.editTimezone.setModels(this.timeZones, this.timeZones.indexOf(this.inputTimeZone))
    this.cdref.detectChanges();
  }
}

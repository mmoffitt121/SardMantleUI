import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar, Formatter, TimeZone } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-edit-datetime',
  templateUrl: './edit-datetime.component.html',
  styleUrls: ['./edit-datetime.component.scss']
})
export class EditDatetimeComponent implements OnInit {
  @Input() thick = false;
  @Input() public calendar: Calendar;
  @Input() formatter: Formatter;
  @Input() timeZone: TimeZone;
  @Input() calendarId: number | undefined;
  @Input() formatterId: number | undefined;
  @Input() useBaseYear: boolean = false;
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  public typeParameterId: any;

  @Input() displayFilterOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 0, name: "Equals"},
    { filterMode: 6, name: "Before"},
    { filterMode: 5, name: "After"},
  ];
  @Input() public selectedFilterOption = { filterMode: 0, name: "Equals"};

  @Input() model?: bigint;
  @Output() modelChange = new EventEmitter<bigint>();

  @Input() formatterIndex = 0;

  public display = "";

  public modelChanged(event: any) {
    this.model = event.dateTime;
    this.calendar = event.calendar;
    this.formatter = event.formatter ?? this.formatter ?? this.calendar.formatters[0];
    this.timeZone = event.timeZone ?? this.timeZone ?? this.calendar.timeZones[0];

    this.calendarService.selectedCalendar = event.calendar ?? this.calendarService.selectedCalendar;
    this.calendarService.selectedFormatter = event.formatter ?? this.calendarService.selectedFormatter;
    this.calendarService.selectedTimeZone = event.timeZone ?? this.calendarService.selectedTimeZone;

    this.modelChange.emit(event.dateTime);
    this.updateDisplay();
  }

  public updateDisplay() {
    if (!this.calendar) {
      this.display = "";
    }
    else if (this.model == undefined) {
      this.display = "";
    }
    else {
      this.display = this.calendarService.format(BigInt(this.model), this.calendar, this.formatter, this.useBaseYear);
    }
  }

  public getValue() {
    return this.model;
  }

  public setValue(model: bigint) {
    this.model = model;
    this.updateDisplay();
  }

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    this.calendar = this.calendar ?? this.calendarService.selectedCalendar ?? this.calendarService.getCalendarAndFormatter('{}')?.calendar;
    this.formatter = this.formatter ?? this.calendarService.selectedFormatter ?? this.calendarService.getCalendarAndFormatter('{}')?.formatter;
    this.timeZone = this.timeZone ?? this.calendarService.selectedTimeZone;

    this.updateDisplay();
  }
}

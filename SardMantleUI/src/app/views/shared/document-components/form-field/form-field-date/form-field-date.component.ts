import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { Calendar, Formatter, TimeZone } from 'src/app/models/units/calendar';
import { FormatWidth } from '@angular/common';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { FormControl } from '@angular/forms';
import { CalendarPickerComponent } from 'src/app/views/timeline/calendar/calendar-picker/calendar-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-field-date',
  templateUrl: './form-field-date.component.html',
  styleUrls: ['./form-field-date.component.scss']
})
export class FormFieldDateComponent extends FormFieldBasicComponent implements OnChanges {
  public calendar: Calendar;
  formatter: Formatter;
  timeZone: TimeZone;
  @Input() useBaseYear: boolean = false;
  @Input() disabled: boolean = false;

  displayControl = new FormControl({value: "", disabled: true});

  public modelChanged(event: any) {
    this.parameter.value = event.dateTime;
    this.calendar = event.calendar;
    this.formatter = event.formatter ?? this.formatter ?? this.calendar.formatters[0];
    this.timeZone = event.timeZone ?? this.timeZone ?? this.calendar.timeZones[0];

    this.calendarService.selectedCalendar = event.calendar ?? this.calendarService.selectedCalendar;
    this.calendarService.selectedFormatter = event.formatter ?? this.calendarService.selectedFormatter;
    this.calendarService.selectedTimeZone = event.timeZone ?? this.calendarService.selectedTimeZone;

    this.updateDisplay();
  }

  public updateDisplay() {
    if (!this.calendar || this.parameter?.value == undefined) {
      this.displayControl.setValue("");
    } else {
      this.displayControl.setValue(this.calendarService.format(BigInt(this.parameter?.value), this.calendar, this.formatter, this.useBaseYear));
    }
  }

  public open() {
    if (this.disabled) {
      return;
    }
    const dialogRef = this.dialog.open(CalendarPickerComponent, {
      width: '500px',
      height: '600px',
      data: {
        calendar: this.calendar,
        formatter: this.formatter,
        timeZone: this.timeZone,
        dateTime: BigInt(this.parameter?.value ?? this.calendarService.getDefaultDate()),
        useBaseYear: this.useBaseYear,
        editTime: false
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.parameter.value = String(result.dateTime) ?? this.parameter.value;
      this.calendar = result.calendar ?? this.calendar;
      this.formatter = result.format ?? this.formatter;
      this.timeZone = result.timeZone ?? this.timeZone;

      if (result && result.dateTime == undefined) {
        this.parameter.value = undefined;
      }
      this.updateDisplay();
      this.valueChanged.emit(this.parameter.value);
    });
  }

  public set() {
    let calendarAndFormatter = this.calendarService.getCalendarAndFormatter(this.parameter.typeParameterSettings);
    if (!calendarAndFormatter) {return;}
    if (!calendarAndFormatter.calendar) {
      this.disabled = true;
      this.displayControl.setValue("");
      return;
    }
    this.calendar = calendarAndFormatter.calendar;
    this.formatter = calendarAndFormatter.formatter;
    this.displayControl.setValue(this.calendarService.format(this.parameter.value, calendarAndFormatter.calendar, calendarAndFormatter.formatter));
    this.valueChanged.emit(this.parameter.value);
  }

  public override registerFilterOptions(): void {
    this.filterOptions = [
      { filterMode: 0, name: "Equals"},
      { filterMode: 6, name: "Before"},
      { filterMode: 5, name: "After"},
    ];
  }

  constructor(public calendarService: CalendarService, private dialog: MatDialog) { 
    super(); 
    calendarService.$calendarsLoaded.pipe(takeUntil(this.destroyed$)).subscribe(loaded => {
      if (loaded && this.parameter) {
        // Set here to format the value once calendars are loaded
        this.set();
      }
    })
  }

  public override ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameter'] && this.calendarService.calendarsLoaded.value) {
      // If calendars aren't loaded, don't try to set. Instead, handle above when calendars are done loading.
      this.set();
    }
  }
}

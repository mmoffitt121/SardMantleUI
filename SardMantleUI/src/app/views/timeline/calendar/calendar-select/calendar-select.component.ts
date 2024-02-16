import { Component, Output, EventEmitter } from '@angular/core';
import { Calendar } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss']
})
export class CalendarSelectComponent {
  @Output() selected = new EventEmitter(); 


  public select(calendar: Calendar) {
    this.selected.emit(calendar);
  }

  constructor (public calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.loadCalendars();
  }
}

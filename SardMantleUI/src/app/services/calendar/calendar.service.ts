import { Injectable, OnInit } from '@angular/core';
import { CalendarDataService } from './calendar-data.service';
import { Calendar } from 'src/app/models/units/calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendars: Calendar[];

  public loadCalendars() {
    this.dataService.get({}).subscribe(data => {
      this.calendars = data;
      console.log("Getting calendars")
      console.log(data)
    });
  }
  
  constructor(private dataService: CalendarDataService) {
    this.loadCalendars();
  }
}

import { Injectable, OnInit } from '@angular/core';
import { CalendarDataService } from './calendar-data.service';
import { Calendar } from 'src/app/models/units/calendar';
import { DateTimeObject } from 'src/app/models/timeline/time';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendars: Calendar[];

  public loadCalendars() {
    this.dataService.get({}).subscribe(data => {
      this.calendars = data;
    });
  }

  public toDateTimeObject(dateTime: bigint, calendar: Calendar) {
    return {
      year: Number(this.getYear(dateTime, calendar)),
      month: Number(this.getMonth(dateTime, calendar)),
      day: Number(this.getDay(dateTime, calendar)),
      time: this.getTime(dateTime, calendar).map(x => Number(x)),
      weekday: Number(this.getWeekday(dateTime, calendar)),
    } as DateTimeObject;
  }

  public getDaysPerYear(calendar: Calendar) {
    let daysPerYear = 0n;
    calendar.months.forEach(m => {
      daysPerYear += BigInt(m.days);
    });
    return daysPerYear;
  }

  public getYear(dateTime: bigint, calendar: Calendar) {
    let daysPerYear = BigInt(this.getDaysPerYear(calendar));
    
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    return day / daysPerYear;
  }

  public getMonth(dateTime: bigint, calendar: Calendar) {
    let daysPerYear = BigInt(this.getDaysPerYear(calendar));
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    let year = this.getYear(dateTime, calendar);

    let dayInYear = day - year * daysPerYear;
    let month = 1n;

    for (let i = 0; i < calendar.months.length; i++) {
      if (dayInYear - BigInt(calendar.months[i].days) < 0n) {
        break;
      } else {
        month++;
        dayInYear -= BigInt(calendar.months[i].days);
      }
    }

    return month;
  }

  public getDay(dateTime: bigint, calendar: Calendar) {
    let daysPerYear = BigInt(this.getDaysPerYear(calendar));
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    let year = this.getYear(dateTime, calendar);

    let dayInYear = day - year * daysPerYear;
    let dayInMonth = 1n;

    for (let i = 0; i < calendar.months.length; i++) {
      if (dayInYear - BigInt(calendar.months[i].days) < 0n) {
        dayInMonth = dayInYear + 1n;
        break;
      } else {
        dayInYear -= BigInt(calendar.months[i].days);
      }
    }

    return dayInMonth;
  }

  public getTime(dateTime: bigint, calendar: Calendar) {
    let currentTime = dateTime % BigInt(calendar.unitTimePerDay);
    let times = [] as bigint[];
    let timeUnits = [...calendar.timeUnits].reverse();
    console.log(timeUnits)

    let value = currentTime;
    let remainder = 0n;
    for (let i = 0; i < timeUnits.length - 1; i++) {
      remainder = value % BigInt(timeUnits[i+1].amountPerDerived);
      value = value / BigInt(timeUnits[i+1].amountPerDerived);
      times.push(remainder);
    }
    times.push(value);

    return [...times.reverse()];
  }

  public getEra(dateTime: bigint, calendar: Calendar) {

  }

  public getWeekday(dateTime: bigint, calendar: Calendar) {
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    return day % BigInt(calendar.weekdays.length);
  }

  public fromDateTimeObject(dateTimeObject: DateTimeObject, calendar: Calendar) {

  }
  
  constructor(private dataService: CalendarDataService) {
    this.loadCalendars();
  }
}

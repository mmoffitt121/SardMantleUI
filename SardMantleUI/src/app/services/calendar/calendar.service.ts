import { Injectable, OnInit } from '@angular/core';
import { CalendarDataService } from './calendar-data.service';
import { Calendar, Formatter, TimeZone, Week } from 'src/app/models/units/calendar';
import { DateTimeObject } from 'src/app/models/timeline/time';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendars: Calendar[];
  public selectedCalendar: Calendar;
  public selectedFormatter: Formatter;

  public loadCalendars() {
    this.dataService.get({}).subscribe(data => {
      this.calendars = data;
    });
  }

  // -=-=-=-=-=-=-=-=-
  // Conversions
  // -=-=-=-=-=-=-=-=-

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

  public getWeek(dateTime: bigint, calendar: Calendar) {
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    return day / BigInt(calendar.weekdays.length);
  }

  public getBaseYear(dateTime: bigint, calendar: Calendar) {
    let daysPerYear = BigInt(this.getDaysPerYear(calendar));
    
    let day = dateTime / BigInt(calendar.unitTimePerDay);
    return day / daysPerYear;
  }

  public fromDateTimeObject(dateTimeObject: DateTimeObject, calendar: Calendar) {
    let time = 0n;
    
    time += BigInt(dateTimeObject.year) * this.getDaysPerYear(calendar) * BigInt(calendar.unitTimePerDay);

    let days = 0n;
    for (let i = 0; i < dateTimeObject.month-1; i++) {
      days += BigInt(calendar.months[i].days);
    }
    days += BigInt(dateTimeObject.day - 1);    

    time += days * BigInt(calendar.unitTimePerDay);
    
    time += this.getTimeFromTimeArray(dateTimeObject.time, calendar);

    return time;
  }

  public getTimeFromTimeArray(timeArray: number[], calendar: Calendar) {
    let time = 0n;
    let amountToMultiply = 1n;
    let timeUnits = [...calendar.timeUnits].reverse();
    let times = [...timeArray].reverse();
    for (let i = 0; i < timeArray.length; i++) {
      amountToMultiply *= BigInt(timeUnits[i].amountPerDerived);
      time += BigInt(times[i]) * amountToMultiply;
    }

    return time;
  }

  getDateTimeFromBaseYear(year: bigint, calendar: Calendar) {
    let daysPerYear = BigInt(this.getDaysPerYear(calendar));
    
    return year * daysPerYear * BigInt(calendar.unitTimePerDay);
  }

  public getWeeksInMonth(time: bigint, calendar: Calendar) {
    let selectedDate = this.toDateTimeObject(time, calendar);
    let targetMonth = selectedDate.month;

    let firstDateOfMonth = {...selectedDate}
    firstDateOfMonth.day = 1;
    firstDateOfMonth.time = new Array(firstDateOfMonth.time.length).fill(0);
    let firstTimeOfMonth = this.fromDateTimeObject(firstDateOfMonth, calendar);
    firstDateOfMonth = this.toDateTimeObject(firstTimeOfMonth, calendar);
    let currentDay = this.addDays(-1 * firstDateOfMonth.weekday, firstTimeOfMonth, calendar);

    let weeks = [] as Week[];
    let w = 0;
    while (w < this.getMaxWeekDisplay(calendar)) {
      let days = [];
      for (let i = 0; i < calendar.weekdays.length; i++) {
        days.push(this.toDateTimeObject(currentDay, calendar));
        currentDay = this.addDays(1, currentDay, calendar);
      }
      weeks.push({
        number: this.getWeek(currentDay, calendar),    
        days: days
      });

      w++;
    }

    return weeks;
  }

  public getMaxWeekDisplay(calendar: Calendar) {
    let maxDays = 0;
    calendar.months.forEach(m => {
      if (m.days > maxDays) {
        maxDays = m.days;
      }
    });

    return Math.floor(maxDays / calendar.weekdays.length) + 2; 
  }

  // -=-=-=-=-=-=-=-=-
  // Format
  // -=-=-=-=-=-=-=-=-

  public format(time: bigint, calendar?: Calendar, formatter?: Formatter) {
    if (!formatter) {
      if (calendar) {
        formatter = calendar.formatters[0];
      } 
      else if (this.selectedFormatter) {
        formatter = this.selectedFormatter;
      }
      else {
        formatter = this.selectedCalendar?.formatters[0];
      }
    }
    if (!calendar) {
      calendar = this.selectedCalendar;
    }

    return this.parseFormattedDate(this.toDateTimeObject(time, calendar), calendar, formatter);
  }

  private parseFormattedDate(dto: DateTimeObject, calendar: Calendar, formatter: Formatter) {
    let map = this.buildFormatValueMap(dto, calendar);
    let output: string[] = [];
    let specialTokens = new Set(["$", "`"]);

    let i = 0;
    let source = formatter.formatter
    let end = source.length;
    while (true) {
      // Get the current token
      let currentToken = source[i];
      let j = i + 1;
      let coreLength = 1;
      while ((source.charAt(j) == currentToken) || specialTokens.has(source.charAt(j))) {
        if (source.charAt(j) == currentToken) {coreLength++;}
        j++;
      }

      let formatToken = source.substring(i, j);
      let valueToDisplay = map.get(currentToken) + "";
      if (valueToDisplay === "undefined") {
        valueToDisplay = formatToken;
      }
      let outputToken = "";
      if (!formatToken.includes("`") && coreLength > valueToDisplay.length) {
        outputToken += "0".repeat(coreLength - valueToDisplay.length);
        outputToken += valueToDisplay;
      }
      else if (formatToken.includes("$") && coreLength < valueToDisplay.length) {
        outputToken += valueToDisplay.substring(0, coreLength);
      }
      else {
        outputToken += valueToDisplay;
      }
      output.push(outputToken);

      // Fill current token with characters
      // Append new characters to output

      i = j;
      if (i >= end) { break;}
    }
    /*for (let i = 0; i < formatter.formatter.length; i++) {
      let current = formatter.formatter.charAt(i);
      if (map.get(current)) {
        output.push(map.get(current));
      }
      else {
        output.push(current);
      }
    }*/
    return output.join("");
  }

  private buildFormatValueMap(dto: DateTimeObject, calendar: Calendar) {
    let map = new Map();

    map.set("d", dto.day);
    map.set("W", calendar.weekdays[dto.weekday].name);
    map.set("w", calendar.weekdays[dto.weekday].formatter);
    map.set("m", dto.month);
    map.set("M", calendar.months[dto.month - 1].name);
    map.set("y", dto.year);

    calendar.timeUnits.forEach(u => {
      map.set(u.formatter, dto.time[calendar.timeUnits.indexOf(u)]);
    });

    /*calendar.eras.forEach(e => {
      map.set(e.formatter, dto.era[calendar.eras.indexOf(e)]);
    });*/

    return map;
  }

  // -=-=-=-=-=-=-=-=-
  // Transformations
  // -=-=-=-=-=-=-=-=-

  public addDays(days: bigint | number, time: bigint, calendar: Calendar) {
    return time + BigInt(days) * BigInt(calendar.unitTimePerDay);
  } 

  public addMonths(months: number, time: bigint, calendar: Calendar) {
    let dto = this.toDateTimeObject(time, calendar);
    
    dto.year += Math.floor((dto.month + months - 1) / calendar.months.length);
    calendar.months.length;

    let monthDelta = dto.month + months - 1;
    let monthLength = calendar.months.length;
    dto.month = ((monthDelta % monthLength) + monthLength) % monthLength + 1;
    dto.day = 1;
    dto.time = new Array(dto.time.length).fill(0);
    return this.fromDateTimeObject(dto, calendar);
  } 

  public setMonth(month: number, time: bigint, calendar: Calendar) {
    let dto = this.toDateTimeObject(time, calendar);
    dto.month = month;
    return this.fromDateTimeObject(dto, calendar);
  } 
  
  constructor(private dataService: CalendarDataService) {
    this.loadCalendars();
  }
}

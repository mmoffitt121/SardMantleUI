import { Injectable, OnInit } from '@angular/core';
import { CalendarDataService } from './calendar-data.service';
import { Calendar, Era, EraDefinition, Formatter, TimeZone, Week } from 'src/app/models/units/calendar';
import { DateTimeObject } from 'src/app/models/timeline/time';
import { UrlService } from '../url/url.service';
import { BehaviorSubject } from 'rxjs';

export const SAVED_TIME = "SavedTime"

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendars: Calendar[];
  public selectedCalendar: Calendar;
  public selectedFormatter: Formatter;
  public selectedTimeZone: TimeZone;

  public calendarsLoaded = new BehaviorSubject<boolean>(false);
  public $calendarsLoaded = this.calendarsLoaded.asObservable();

  public loadCalendars() {
    this.calendarsLoaded.next(false);
    this.dataService.get({}).subscribe(data => {
      this.calendars = data;
      this.calendarsLoaded.next(true);
    });
  }

  public ensureCalendarsLoaded() {
    // Do nothing, as all this needs to do is make sure the class is loaded.
  }

  // -=-=-=-=-=-=-=-=-
  // Conversions
  // -=-=-=-=-=-=-=-=-

  public toDateTimeObject(dateTime: bigint, calendar: Calendar) {
    return {
      year: this.getYear(dateTime, calendar),
      eraYear: this.getEraYear(dateTime, calendar),
      month: Number(this.getMonth(dateTime, calendar)),
      day: Number(this.getDay(dateTime, calendar)),
      time: this.getTime(dateTime, calendar).map(x => Number(x)),
      weekday: Number(this.getWeekday(dateTime, calendar)),
      era: this.getEraFill(dateTime, calendar),
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
    return this.getBaseYear(dateTime, calendar);
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

  public getEraEmpty(dateTime: bigint, calendar: Calendar) {
    let eras = [] as (EraDefinition | undefined)[];
    calendar.eras.forEach(e => {
      eras.push(e.eraDefinitions?.find(def => BigInt(def.start) <= dateTime && BigInt(def.end) >= dateTime));
    });

    return eras;
  }

  public getEraFill(dateTime: bigint, calendar: Calendar) {
    let eras = [] as (EraDefinition | undefined)[];
    calendar.eras.forEach(e => {
      if (e.eraDefinitions) {
        let defs = [...e.eraDefinitions].sort((a, b) => BigInt(a.start) < BigInt(b.start) ? 1 : -1);
        eras.push(defs.find(def => BigInt(def.start) <= dateTime)!);
      }
    });

    return eras;
  }

  public getEraYear(dateTime: bigint, calendar: Calendar) {
    let eras = this.getEraFill(dateTime, calendar);
    let year = this.getBaseYear(dateTime, calendar);
    let baseYear = 0n;
    eras.forEach(e => {
      if (e != undefined) {
        baseYear = this.getBaseYear(BigInt(e.start), calendar);
      }
    });
    return year - baseYear;
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
    
    let day = BigInt(dateTime) / BigInt(calendar.unitTimePerDay);
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

  public extractTimeValue(time: bigint, calendar: Calendar) {
    return time % BigInt(calendar.unitTimePerDay);
  }

  public applyEraDefinitionNumbers(calendar: Calendar) {
    if (calendar.eras.length < 1) return;

    calendar.eras.forEach(e => {
      e.eraDefinitions = e.eraDefinitions.sort((d1, d2) => BigInt(d1.start) < BigInt(d2.start) ? -1 : 1)
    })
    let i = 0;
    calendar.eras[0].eraDefinitions.forEach(def => {
      def.eraNumber = i + 1;
      this.applyEraDefinitionNumberToChildren(0, i, calendar);
      i++;
    })
    
  }

  // Recursive function for calculating and adding the era number
  private applyEraDefinitionNumberToChildren(currentEra: number, currentEraDefinition: number, calendar: Calendar) {
    // Base case - If we are at the end of the array, we are done. Return.
    if (currentEra >= calendar.eras.length - 1) {
      return;
    }

    // Next case - We still have work to do
    // Iterate through all values in the next era down that are in the range of the current era definition. Set the values to the iterator.
    // Call this function on each child.
    let startRange = BigInt(calendar.eras[currentEra].eraDefinitions[currentEraDefinition].start);
    let endRange = BigInt(calendar.eras[currentEra].eraDefinitions[currentEraDefinition].end);
    let inRange = calendar.eras[currentEra+1].eraDefinitions.filter(def => (BigInt(def.start) >= startRange) && (BigInt(def.start) < endRange));
    for (let i = 0; i < inRange.length; i++) {
      inRange[i].eraNumber = i + 1;
      this.applyEraDefinitionNumberToChildren(currentEra + 1, calendar.eras[currentEra + 1].eraDefinitions.indexOf(inRange[i]), calendar);
    }
  }

  // -=-=-=-=-=-=-=-=-
  // Defaults
  // -=-=-=-=-=-=-=-=-

  public saveDefaultDate(time: bigint) {
    localStorage.setItem(`${this.urlService.getWorld()}-${SAVED_TIME}`, String(time));
  }

  public getDefaultDate(): bigint {
    return BigInt(localStorage.getItem(`${this.urlService.getWorld()}-${SAVED_TIME}`) ?? 0n);
  }

  // -=-=-=-=-=-=-=-=-
  // Format
  // -=-=-=-=-=-=-=-=-

  public format(time?: bigint | string, calendar?: Calendar, formatter?: Formatter, useBaseYear?: boolean) {
    if (time == undefined) {
      return "";
    }

    let bigIntTime = BigInt(time);

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

    return this.parseFormattedDate(this.toDateTimeObject(bigIntTime, calendar), calendar, formatter, useBaseYear);
  }

  private parseFormattedDate(dto: DateTimeObject, calendar: Calendar, formatter: Formatter, useBaseYear?: boolean) {
    let map = this.buildFormatValueMap(dto, calendar, useBaseYear);
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

      i = j;
      if (i >= end) { break;}
    }
    return output.join("");
  }

  private buildFormatValueMap(dto: DateTimeObject, calendar: Calendar, useBaseYear?: boolean) {
    let map = new Map();

    map.set("d", dto.day);
    map.set("W", calendar.weekdays[dto.weekday].name);
    map.set("w", calendar.weekdays[dto.weekday].formatter);
    map.set("m", dto.month);
    map.set("M", calendar.months[dto.month - 1].name);
    map.set("y", useBaseYear ? dto.year : dto.eraYear);

    calendar.timeUnits.forEach(u => {
      map.set(u.formatter, dto.time[calendar.timeUnits.indexOf(u)]);
    });

    calendar.eras.forEach(e => {
      map.set(e.formatter, useBaseYear ? " " : dto.era[calendar.eras.indexOf(e)]?.eraNumber);
      map.set(e.nameFormatter, useBaseYear ? " " : dto.era[calendar.eras.indexOf(e)]?.name);
    });

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
    
    dto.year += BigInt(Math.floor((dto.month + months - 1) / calendar.months.length));
    calendar.months.length;

    let monthDelta = dto.month + months - 1;
    let monthLength = calendar.months.length;
    dto.month = ((monthDelta % monthLength) + monthLength) % monthLength + 1;
    dto.day = 1;
    dto.time = new Array(dto.time.length).fill(0);
    return this.fromDateTimeObject(dto, calendar);
  } 

  public addYears(years: bigint | number, time: bigint, calendar: Calendar) {

  }

  public setMonth(month: number, time: bigint, calendar: Calendar) {
    let dto = this.toDateTimeObject(time, calendar);
    dto.month = month;
    return this.fromDateTimeObject(dto, calendar);
  } 

  public getCalendar(id: number): Calendar {
    return this.calendars.find(c => c.id == id) ?? this.selectedCalendar;
  }

  public getFormatter(id: number, calendar: Calendar): Formatter {
    return calendar.formatters.find(f => f.id == id) ?? calendar.formatters[0] ?? undefined;
  } 

  public getCalendarAndFormatter(settingsString: string) {
    let settings = JSON.parse(settingsString ? settingsString : "{}");
    let calendar;
    let formatter;
    if (settings.calendar) {
      calendar = this.getCalendar(settings.calendar);
      if (settings.formatter) {
        formatter = this.getFormatter(settings.formatter, calendar);
      }
    }

    if (!calendar) {
      if (!this.calendars.length) {
        return undefined;
      }
      calendar = this.calendars[0];
    }
    if (!formatter) {
      formatter = calendar.formatters[0];
    }

    return {calendar, formatter};
  }
  
  constructor(private dataService: CalendarDataService, private urlService: UrlService) {
    this.loadCalendars();
  }
}

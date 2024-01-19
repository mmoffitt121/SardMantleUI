import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimeObject } from 'src/app/models/timeline/time';
import { Calendar, EraDefinition } from 'src/app/models/units/calendar';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-picker-era-select',
  templateUrl: './calendar-picker-era-select.component.html',
  styleUrls: ['./calendar-picker-era-select.component.scss']
})
export class CalendarPickerEraSelectComponent implements OnInit {
  @Input() public calendar: Calendar;
  @Input() public eraIndex: number;
  @Input() public currentTime: bigint;
  @Input() public time: bigint;
  @Input() public useBaseYear: boolean;
  @Output() public timeChange = new EventEmitter<bigint>();
  public options: EraDefinition[];
  public displayDTO: DateTimeObject;

  public endingYear: number | undefined = undefined;
  public yearChoice = 0n;

  @Output() submit = new EventEmitter();
  
  public selectingEra() {
    return this.eraIndex < this.calendar.eras.length;
  }

  public setOptions() {
    if (this.eraIndex == 0) {
      this.options = this.calendar.eras[this.eraIndex].eraDefinitions;
    }
    else if (this.selectingEra()) {
      let previous = this.calendarService.getEraFill(this.currentTime, this.calendar);
      let previousDef = previous[this.eraIndex - 1];
      this.options = this.calendar.eras[this.eraIndex].eraDefinitions.filter(def => BigInt(def.start) >= BigInt(previousDef?.start ?? 0) && BigInt(def.start) < BigInt(previousDef?.end ?? 0))
    }
    else {
      let previous = this.calendarService.getEraFill(this.currentTime, this.calendar);
      let previousDef = previous[this.eraIndex - 1];
      this.endingYear = Number(this.calendarService.getBaseYear(BigInt(previousDef?.end ?? 0), this.calendar) 
        - this.calendarService.getBaseYear(BigInt(previousDef?.start ?? 0), this.calendar));
    }
    this.displayDTO = this.calendarService.toDateTimeObject(this.currentTime, this.calendar);
  }

  public advance(def: EraDefinition) {
    this.currentTime = BigInt(def.start);
    this.eraIndex++;
    this.setOptions();
  }

  public select() {
    let dto = this.calendarService.toDateTimeObject(this.currentTime, this.calendar);
    let baseYear = this.useBaseYear ? 0n : this.calendarService.getBaseYear(BigInt(dto.era[dto.era.length - 1]!.start), this.calendar);
    dto.year = baseYear + BigInt(this.yearChoice);
    dto.month = this.yearChoice == 0n ? dto.month : 1;
    let finalValue = this.calendarService.fromDateTimeObject(dto, this.calendar);
    this.timeChange.emit(finalValue);
  }

  constructor(private calendarService: CalendarService) {} 

  ngOnInit(): void {
    this.setOptions();
    console.log(this.currentTime);
    if (this.eraIndex == this.calendar.eras.length) {
      let previous = this.calendarService.getEraFill(this.currentTime, this.calendar);
      let previousDef = previous[this.eraIndex - 1];
      this.currentTime = BigInt(previousDef?.start ?? 0n);
    }
  }
}

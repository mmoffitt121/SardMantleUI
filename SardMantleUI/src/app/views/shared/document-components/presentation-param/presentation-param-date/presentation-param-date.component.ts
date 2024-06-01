import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PresentationParamBaseComponent } from '../presentation-param-base/presentation-param-base.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Calendar, Formatter } from 'src/app/models/units/calendar';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-presentation-param-date',
  templateUrl: './presentation-param-date.component.html',
  styleUrls: ['./presentation-param-date.component.scss']
})
export class PresentationParamDateComponent extends PresentationParamBaseComponent implements OnChanges, OnDestroy {
  public calendar: Calendar;
  public formatter: Formatter;

  public formattedValue: string;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public set() {
    let calendarAndFormatter = this.calendarService.getCalendarAndFormatter(this.parameter.typeParameterSettings);
    this.formattedValue = this.calendarService.format(this.parameter.value, calendarAndFormatter.calendar, calendarAndFormatter.formatter);
  }

  constructor(public calendarService: CalendarService) {
    super();
    calendarService.$calendarsLoaded.pipe(takeUntil(this.destroyed$)).subscribe(loaded => {
      if (loaded && this.parameter) {
        // Set here to format the value once calendars are loaded
        this.set();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameter'] && this.calendarService.calendarsLoaded.value) {
      // If calendars aren't loaded, don't try to set. Instead, handle above when calendars are done loading.
      this.set();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

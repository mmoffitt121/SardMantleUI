import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewDatetimeComponent } from '../../view/view-datetime/view-datetime.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-view-param-date',
  templateUrl: './view-param-date.component.html',
  styleUrls: ['./view-param-date.component.scss']
})
export class ViewParamDateComponent extends ViewDatetimeComponent implements OnChanges {
  @Input() settingsString: string;
  private settings: any;

  public displayValue() {
    
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['settingsString']) {
      this.settings = JSON.parse(this.settingsString);
      this.calendar = this.calendarService.getCalendar(this.settings.calendar);
      if (this.calendar) {
        this.formatter = this.calendarService.getFormatter(this.settings.formatter, this.calendar);
        this.setValue(this.value);
      }
    }
    if (changes['value'] && this.calendar) {
      this.setValue(this.value);
    }
  }
}

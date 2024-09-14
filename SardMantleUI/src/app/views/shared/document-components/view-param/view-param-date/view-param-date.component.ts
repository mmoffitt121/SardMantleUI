import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewDatetimeComponent } from '../../view/view-datetime/view-datetime.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { PresentationParamDateComponent } from '../../presentation-param/presentation-param-date/presentation-param-date.component';

@Component({
  selector: 'app-view-param-date',
  templateUrl: './view-param-date.component.html',
  styleUrls: ['./view-param-date.component.scss']
})
export class ViewParamDateComponent extends PresentationParamDateComponent {

}

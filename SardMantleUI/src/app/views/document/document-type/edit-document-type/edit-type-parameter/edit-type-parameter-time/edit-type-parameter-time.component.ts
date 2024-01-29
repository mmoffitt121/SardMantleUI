import { Component, ViewChild } from '@angular/core';
import { DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { Calendar, Formatter } from 'src/app/models/units/calendar';
import { CalendarDataService } from 'src/app/services/calendar/calendar-data.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';
import { EditDataPointComponent } from 'src/app/views/shared/document-components/edit/edit-data-point/edit-data-point.component';

@Component({
  selector: 'app-edit-type-parameter-time',
  templateUrl: './edit-type-parameter-time.component.html',
  styleUrls: ['./edit-type-parameter-time.component.scss']
})
export class EditTypeParameterTimeComponent  {
  public documentTypeParameter: DocumentTypeParameter;
  public calendars: Calendar[];
  public formatters: Formatter[];
  public settings: any;
  @ViewChild('editCalendar') editCalendar: EditDataPointComponent;
  @ViewChild('editFormatter') editFormatter: EditDataPointComponent;

  public setValues(p: DocumentTypeParameter) {
    this.documentTypeParameter = p;
    if (p.typeValue !== 'tim') return;
    
    this.settings = this.documentTypeParameter.settings ? JSON.parse(this.documentTypeParameter.settings) : {}
    
    this.calendarDataService.get({}).subscribe(data => {
      this.calendars = data;
      let cal = data.find((cal: any) => cal.id === this.settings.calendar);
      let calIndex = data.indexOf(cal);
      if (calIndex > -1) {
        this.editCalendar.setModels(this.calendars, data.indexOf(cal));

        this.formatters = cal.formatters;
        let formatterIndex = cal.formatters.indexOf(cal.formatters.find((f: any) => f.id === this.settings.formatter));
        if (formatterIndex > -1) {
          this.editFormatter.setModels(cal.formatters, formatterIndex);
        }
        else {
          this.editFormatter.clearSelection();
        }
      }
      else {
        this.editCalendar.clearSelection();
        this.editFormatter.clearSelection();
      }
    });
  }

  public selectCalendar(e: any) {
    if (e === undefined) return;
    this.settings = {...this.settings, calendar: e.id};
    this.documentTypeParameter.settings = JSON.stringify(this.settings);
    this.editFormatter.clearSelection();
    this.formatters = e.formatters;
  }

  public selectFormatter(e: any) {
    if (e === undefined) return;
    this.settings = {...this.settings, formatter: e.id};
    this.documentTypeParameter.settings = JSON.stringify(this.settings);
  }

  public constructor (private errorService: ErrorService, private typeService: DocumentTypeService, private calendarService: CalendarService, private calendarDataService: CalendarDataService) {}
}
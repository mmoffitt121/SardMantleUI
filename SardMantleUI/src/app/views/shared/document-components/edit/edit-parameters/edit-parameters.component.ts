import { Component, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { EditIntComponent } from '../edit-int/edit-int.component';
import { EditDoubleComponent } from '../edit-double/edit-double.component';
import { EditStringComponent } from '../edit-string/edit-string.component';
import { EditSummaryComponent } from '../edit-summary/edit-summary.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { EditDataPointComponent } from '../edit-data-point/edit-data-point.component';
import { EditBoolComponent } from '../edit-bool/edit-bool.component';
import { EditDatetimeComponent } from '../edit-datetime/edit-datetime.component';
import { UnitsService } from 'src/app/services/units/units.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-edit-parameters',
  templateUrl: './edit-parameters.component.html',
  styleUrls: ['./edit-parameters.component.scss']
})
export class EditParametersComponent {
  public typeParameters: any[] = [];
  public parameters: any[] = [];
  public parameterComponents: any[] = [];

  @ViewChild('parameterContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  public setTypeParameters(typeParameters: any[]) {
    this.typeParameters = typeParameters;
    this.container.clear();
    this.parameterComponents = [];
    let component: any = undefined;
    this.typeParameters.forEach(p => {
      switch (p.typeValue) {
        case 'int':
          component = this.container.createComponent(EditIntComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.intValueString
          );
          component.instance.displayFilterOptions = true;
          break;
        case 'dub':
          component = this.container.createComponent(EditDoubleComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.doubleValue
          );
          component.instance.displayFilterOptions = true;
          break;
        case 'str':
          component = this.container.createComponent(EditStringComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.stringValue
          );
          component.instance.displayFilterOptions = true;
          break;
        case 'sum':
          component = this.container.createComponent(EditStringComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.summaryValue
          );
          component.instance.displayFilterOptions = true;
          break;
        case 'doc':
          component = this.container.createComponent(EditArticleComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.documentValue
          );
          break;
        case 'dat':
          component = this.container.createComponent(EditDataPointComponent)
          this.parameterComponents.push(component);
          let param = this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)
          component.instance.setTypeId(p.dataPointTypeReferenceId ?? -1);
          component.instance.setValue(param);
          break;
        case 'bit':
          component = this.container.createComponent(EditBoolComponent)
          this.parameterComponents.push(component);
          component.instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue
          );
          component.instance.displaySearchOptions = true;
          break;
        case 'tim':
          component = this.container.createComponent(EditDatetimeComponent);
          let timeSettings = JSON.parse(p.settings) ?? {};
          if (timeSettings.calendar) {
            component.instance.calendar = this.calendarService.calendars.find(cal => cal.id == timeSettings.calendar) ?? this.calendarService.selectedCalendar;
            if (timeSettings.formatter) {
              component.instance.formatter = component.instance.calendar.formatters.find((f: any) => timeSettings.formatter == f.id) ?? component.instance.calendar.formatters[0];
            }
          }
          component.instance.displayFilterOptions = true;
          component.instance.thick = true;
          
          let timeParam = this.parameters?.find(x => x?.dataPointTypeParameterId == p.id);
          if (timeParam) {
            component.instance.setValue(timeParam.timeValue);
          }

          this.parameterComponents.push(component);
          break;
        case 'uni':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          let unitParam = this.parameters?.find(x => x?.dataPointTypeParameterId == p.id);
          let instance = this.parameterComponents[this.parameterComponents.length - 1].instance
          instance.setValue(unitParam?.unitValue);
          if (unitParam?.unitvalue === undefined) {
            this.unitService.get({id: p.dataPointTypeReferenceId}).subscribe(units => {
              instance.setUnit(units[0])
            })
          }
          else { instance.setUnit(unitParam?.unit) };
          instance.displayFilterOptions = true;
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = p.name;
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = p.summary;
      this.parameterComponents[this.parameterComponents.length - 1].instance.typeParameterId = p.id;
    });
    this.cdref.detectChanges();
  }

  public getParameterList() {
    let params = [] as any[];
    this.parameterComponents.forEach(p => {
      var param = {};
      switch (this.typeParameters.find(tp => tp.id == p.instance.typeParameterId )?.typeValue) {
        case 'int':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            intValueString: p.instance.getValue()
          }
          break;
        case 'dub':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            doubleValue: p.instance.getValue()
          }
          break;
        case 'str':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            stringValue: p.instance.getValue()
          }
          break;
        case 'sum':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            summaryValue: p.instance.getValue()
          }
          break;
        case 'doc':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            documentValue: p.instance.getValue()
          }
          break;
        case 'dat':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            dataPointValueId: p.instance.getValue()
          }
          break;
        case 'bit':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            boolValue: p.instance.getValue()
          }
          break;
        case 'tim':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            timeValueString: p.instance.getValue()?.toString()
          }
          break;
        case 'uni':
          param = {
            dataPointId: -1,
            dataPointTypeParameterId: p.instance.typeParameterId,
            unitValue: p.instance.getValue()
          }
          break;
      }
      if (p.instance.getValue() !== undefined && p.instance.getValue() !== null && p.instance.getValue() !== "") {
        params.push(param);
      }
    });
    this.parameters = params;
    return this.parameters;
  }

  public getParameterSearchOptions() {
    let searchOptions = [] as any[];
    this.parameterComponents.forEach(p => {
      var opt = {};
      switch (this.typeParameters.find(tp => tp.id == p.instance.typeParameterId )?.typeValue) {
        case 'int':
        case 'str':
        case 'sum':
        case 'dub':
        case 'tim':
        case 'uni':
          opt = {
            dataPointTypeParameterId: p.instance.typeParameterId,
            filterMode: p.instance.selectedFilterOption?.filterMode
          }
          break;
        default:
          opt = {
            dataPointTypeParameterId: p.instance.typeParameterId,
            filterMode: 0
          }
      }
      if (p.instance.getValue() !== undefined && p.instance.getValue() !== null && p.instance.getValue() !== "") {
        searchOptions.push(opt);
      }
    });
    return searchOptions;
  }

  constructor(private cdref: ChangeDetectorRef, private unitService: UnitsService, private calendarService: CalendarService) {

  }
}

import { Component, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { EditIntComponent } from '../edit-int/edit-int.component';
import { EditDoubleComponent } from '../edit-double/edit-double.component';
import { EditStringComponent } from '../edit-string/edit-string.component';
import { EditSummaryComponent } from '../edit-summary/edit-summary.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { EditDataPointComponent } from '../edit-data-point/edit-data-point.component';
import { EditBoolComponent } from '../edit-bool/edit-bool.component';

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
    this.typeParameters.forEach(p => {
      switch (p.typeValue) {
        case 'int':
          this.parameterComponents.push(this.container.createComponent(EditIntComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.intValueString
          );
          break;
        case 'dub':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.doubleValue
          );
          break;
        case 'str':
          this.parameterComponents.push(this.container.createComponent(EditStringComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.stringValue
          );
          break;
        case 'sum':
          this.parameterComponents.push(this.container.createComponent(EditSummaryComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.summaryValue
          );
          break;
        case 'doc':
          this.parameterComponents.push(this.container.createComponent(EditArticleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.documentValue
          );
          break;
        case 'dat':
          this.parameterComponents.push(this.container.createComponent(EditDataPointComponent));
          let param = this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)
          this.parameterComponents[this.parameterComponents.length - 1].instance.setTypeId(p.dataPointTypeReferenceId ?? -1);
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(param);
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(EditBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue
          );
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
      }
      if (p.instance.getValue() !== null) {
        params.push(param);
      }
    });
    this.parameters = params;
    return(this.parameters);
  }

  constructor(private cdref: ChangeDetectorRef) {

  }
}

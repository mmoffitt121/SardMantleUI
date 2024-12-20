import { Component, Input, OnInit } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-field-list',
  templateUrl: './form-field-list.component.html',
  styleUrls: ['./form-field-list.component.scss']
})
export class FormFieldListComponent extends FormFieldBasicComponent implements OnInit {
  parameters: QueriedDataPointParameter[];
  @Input() showFilterOptions: boolean = false;

  public add() {
    this.parameters.push(this.getNew("", undefined))
  }

  public remove(parameter: QueriedDataPointParameter) {
    const index = this.parameters.indexOf(parameter);
    this.parameters.splice(index, 1);
    this.parameter.values?.splice(index, 1);
    this.parameter.valuesData?.splice(index, 1);
  }

  private getNew(value: any, valueData: any) {
    if (this.parameter.typeParameterTypeValue == "bit") {
      value = (value == "True") ? (true) : (false)
    }
    return {
      typeParameterId: this.parameter.typeParameterId, 
      typeParameterName: this.parameter.typeParameterName,
      typeParameterSummary: this.parameter.typeParameterSummary,
      typeParameterTypeValue: this.parameter.typeParameterTypeValue,
      typeParameterSubType: this.parameter.typeParameterSubType,
      typeParameterSequence: this.parameter.typeParameterSequence,
      dataPointTypeReferenceId: this.parameter.dataPointTypeReferenceId,
      typeParameterSettings: this.parameter.typeParameterSettings,
      value: value,
      valueData: valueData,
      values: undefined,
      valuesData: undefined,
      isMultiple: false,
    };
  }

  public onValueChange(value: any, index: number) {
    if (this.parameter.values) {
      this.parameter.values[index] = value;
    }
  }

  drop(event: any) {
    moveItemInArray(this.parameters, event.previousIndex, event.currentIndex);
    moveItemInArray(this.parameter.values ?? [], event.previousIndex, event.currentIndex);
  }

  override ngOnInit(): void {
    this.parameters = this.parameter.values?.map(value => this.getNew(value, this.parameter.valuesData?.find(d => d.id == value))) ?? [];
  }
}

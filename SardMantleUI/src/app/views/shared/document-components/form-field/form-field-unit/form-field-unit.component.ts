import { Component, OnInit } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { UnitsService } from 'src/app/services/units/units.service';
import { Unit } from 'src/app/models/units/unit';

@Component({
  selector: 'app-form-field-unit',
  templateUrl: './form-field-unit.component.html',
  styleUrls: ['./form-field-unit.component.scss']
})
export class FormFieldUnitComponent extends FormFieldBasicComponent implements OnInit {
  public unit: Unit | undefined;

  public override registerValidationFilters() {
    this.filters.push((value: any) => {
      return !isNaN(+value)
    });
  }

  public override registerFilterOptions(): void {
    this.filterOptions = [
      { filterMode: 0, name: "Equals"},
      { filterMode: 6, name: "Less Than"},
      { filterMode: 5, name: "Greater Than"},
    ];
  }

  constructor(private unitService: UnitsService) {
    super();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.unitService.get({id: this.parameter.dataPointTypeReferenceId}).subscribe(units => this.unit = units[0])
  }
}

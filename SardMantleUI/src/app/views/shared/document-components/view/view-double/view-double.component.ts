import { Component, Input } from '@angular/core';
import { Unit } from 'src/app/models/units/unit';
import { UnitsService } from 'src/app/services/units/units.service';

@Component({
  selector: 'app-view-double',
  templateUrl: './view-double.component.html',
  styleUrls: ['./view-double.component.scss']
})
export class ViewDoubleComponent {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() value: string;
  private baseValue: number;

  public units: Unit[] | undefined;
  public unit: Unit | undefined;
  public baseUnit: Unit | undefined;

  public setUnit(unit: Unit) {
    this.unit = unit;
    this.baseUnit = unit;
    this.baseValue = parseFloat(this.value);
  }

  public changeUnit(unit: Unit) {
    this.unit = unit;
    if (!this.baseUnit || !this.unit) {
      return;
    }
    this.value = (this.baseValue / this.baseUnit.amountPerParent * this.unit.amountPerParent).toString()
  }

  public loadUnits() {
    if (!this.units) {
      this.unitService.get({measurableId: this.unit?.measurableId ?? -1}).subscribe(values => {this.units = values});
    }
  }

  constructor(private unitService: UnitsService) {}
}

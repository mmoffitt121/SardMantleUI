import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PresentationParamBaseComponent } from '../presentation-param-base/presentation-param-base.component';
import { UnitsService } from 'src/app/services/units/units.service';
import { Unit } from 'src/app/models/units/unit';

@Component({
  selector: 'app-presentation-param-unit',
  templateUrl: './presentation-param-unit.component.html',
  styleUrls: ['./presentation-param-unit.component.scss']
})
export class PresentationParamUnitComponent extends PresentationParamBaseComponent implements OnChanges {

  public units: Unit[] | undefined;
  public unit: Unit | undefined;
  public baseUnit: Unit | undefined;

  public displayValue: string | undefined;

  public setUnit(unit: Unit) {
    this.unit = unit;
    this.baseUnit = unit;
    this.displayValue = this.parameter.value;
  }

  public changeUnit(unit: Unit) {
    this.unit = unit;
    if (!this.baseUnit || !this.unit) {
      return;
    }
    this.displayValue = (parseFloat(this.parameter.value) / this.baseUnit.amountPerParent * this.unit.amountPerParent).toString()
  }

  public loadUnits() {
    if (this.unit) {
      this.unitService.get({measurableId: this.unit?.measurableId}).subscribe(units => {
        this.units = units;
      })
    }
  }

  constructor(private unitService: UnitsService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameter'] && this.parameter.dataPointTypeReferenceId) {
      this.unitService.get({id: this.parameter.dataPointTypeReferenceId}).subscribe((units: any[]) => {
        this.setUnit(units[0])
      })
    }
  }
}

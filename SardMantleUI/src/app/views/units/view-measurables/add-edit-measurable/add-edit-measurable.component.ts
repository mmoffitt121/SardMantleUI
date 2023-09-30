import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Measurable } from 'src/app/models/units/unit';
import { ErrorService } from 'src/app/services/error.service';
import { MeasurableService } from 'src/app/services/units/measurable.service';

@Component({
  selector: 'app-add-edit-measurable',
  templateUrl: './add-edit-measurable.component.html',
  styleUrls: ['./add-edit-measurable.component.scss']
})
export class AddEditMeasurableComponent {
  public name = new FormControl();
  public summary = new FormControl();
  public unitType = new FormControl();

  public unitTypes = [
    { id: 0, name: "Default" },
    { id: 1, name: "Time" },
  ];
  public selectedUnitType = { id: 0, name: "Default" };

  public selectUnitType(unitType: any) {
    this.selectUnitType = unitType;
  }

  public onCancel() {

  }

  public onSave() {
    this.measurableService.post({name: this.name.value, summary: this.summary.value, unitType: this.selectedUnitType.id} as Measurable).subscribe(res => {
      this.errorService.showSnackBar("Measurable created successfully.");
    }, error => this.errorService.handle(error));
  }

  constructor(private measurableService: MeasurableService, private errorService: ErrorService) {}
}

import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  public editing = false;

  public unitTypes = [
    { id: 0, name: "Default" },
    { id: 1, name: "Time" },
    { id: 2, name: "Distance" },
  ];
  public selectedUnitType = { id: 0, name: "Default" };

  public selectUnitType(unitType: any) {
    this.selectedUnitType = unitType;
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    if (this.editing) {
      this.measurableService.put({id: this.data.id, name: this.name.value, summary: this.summary.value, unitType: this.selectedUnitType.id} as Measurable).subscribe(res => {
        this.errorService.showSnackBar("Measurable saved successfully.");
        this.dialogRef.close(true);
      }, error => this.errorService.handle(error));
    }
    else {
      this.measurableService.post({name: this.name.value, summary: this.summary.value, unitType: this.selectedUnitType.id} as Measurable).subscribe(res => {
        this.errorService.showSnackBar("Measurable created successfully.");
        this.dialogRef.close(true);
      }, error => this.errorService.handle(error));
    }
    
  }

  constructor(
    private measurableService: MeasurableService, 
    private errorService: ErrorService, 
    private dialogRef: MatDialogRef<AddEditMeasurableComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.name.setValue(this.data.name);
      this.summary.setValue(this.data.summary);
      this.selectedUnitType = this.unitTypes.find(u => u.id == this.data.unitType) ?? this.selectedUnitType;
      this.editing = true;
    }
  }
}

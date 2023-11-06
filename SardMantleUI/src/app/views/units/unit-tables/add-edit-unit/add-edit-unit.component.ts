import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Measurable, Unit } from 'src/app/models/units/unit';
import { ErrorService } from 'src/app/services/error.service';
import { MeasurableService } from 'src/app/services/units/measurable.service';
import { UnitsService } from 'src/app/services/units/units.service';

@Component({
  selector: 'app-add-edit-unit',
  templateUrl: './add-edit-unit.component.html',
  styleUrls: ['./add-edit-unit.component.scss']
})
export class AddEditUnitComponent {
  public name = new FormControl();
  public summary = new FormControl();
  public symbol = new FormControl();
  public amountPerBaseUnit = new FormControl();

  public measurables: Measurable[];
  public selectedMeasurable: Measurable | undefined;
  public units: Unit[];

  public editing = false;

  public selectMeasurable(data: any) {
    let oldId = this.selectedMeasurable?.id;
    this.selectedMeasurable = data;
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onSave() {
    if (this.editing) {
      this.unitService.put({
        id: this.data.id, 
        name: this.name.value, 
        summary: this.summary.value,
        amountPerParent: this.amountPerBaseUnit.value,
        measurableId: this.selectedMeasurable?.id,
        symbol: this.symbol.value
      } as Unit).pipe(take(1)).subscribe(res => {
        this.errorService.showSnackBar("Unit saved successfully.");
        this.dialogRef.close(true);
      }, error => this.errorService.handle(error));
    }
    else {
      this.unitService.post({
        id: 0,
        name: this.name.value, 
        summary: this.summary.value,
        amountPerParent: this.amountPerBaseUnit.value,
        measurableId: this.selectedMeasurable?.id,
        symbol: this.symbol.value
      } as Unit).pipe(take(1)).subscribe(res => {
        this.errorService.showSnackBar("Unit created successfully.");
        this.dialogRef.close(true);
      }, error => this.errorService.handle(error));
    }
  }

  constructor(
    private measurableService: MeasurableService, 
    private unitService: UnitsService,
    private errorService: ErrorService, 
    private dialogRef: MatDialogRef<AddEditUnitComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Unit
  ) {}

  ngOnInit() {
    this.measurableService.get({}).pipe(take(1)).subscribe(data => {
      this.measurables = data;
      if (data?.length < 1) {
        this.dialogRef.close();
      }
      this.selectedMeasurable = data[0];
      if (this.data) {
        this.selectedMeasurable = this.measurables.find(m => m.id == this.data.measurableId) ?? this.selectedMeasurable;
      }
    })

    if (this.data) {
      this.name.setValue(this.data.name);
      this.summary.setValue(this.data.summary);
      this.symbol.setValue(this.data.symbol);
      this.amountPerBaseUnit.setValue(this.data.amountPerParent);
      this.editing = true;
    }
  }
}

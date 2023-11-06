import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Measurable } from 'src/app/models/units/unit';
import { ErrorService } from 'src/app/services/error.service';
import { MeasurableService } from 'src/app/services/units/measurable.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AddEditMeasurableComponent } from './add-edit-measurable/add-edit-measurable.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-view-measurables',
  templateUrl: './view-measurables.component.html',
  styleUrls: ['./view-measurables.component.scss']
})
export class ViewMeasurablesComponent {
  public measurables: Measurable[];

  displayedColumns: string[] = ['Name', 'Summary', 'UnitType', 'Actions'];

  public AddNew() {
    const dialogRef = this.dialog.open(AddEditMeasurableComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMeasurables();
      }
    });
  }

  public editMeasurable(measurable: Measurable) {
    const dialogRef = this.dialog.open(AddEditMeasurableComponent, {
      width: '500px',
      data: measurable
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMeasurables();
      }
    });
  }

  private toDelete: number;
  public deleteMeasurable(data: Measurable) {
    this.toDelete = data.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete measurable ${data.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteConfirmed();
      }
    });
  }

  public deleteConfirmed() {
    this.measurableService.delete(this.toDelete).subscribe(result => {
      this.errorService.showSnackBar("Measurable successfully deleted.");
      this.loadMeasurables();
    }, error => {
      this.errorService.handle(error);
    })
  }

  public loadMeasurables() {
    this.measurableService.get({}).subscribe(data => {
      this.measurables = data;
    }, error => this.errorService.handle(error));
  }

  public getUnitType(type: number) {
    switch (type) {
      case 0: 
        return "Default"
      case 1:
        return "Time"
      case 2:
        return "Distance"
      default:
        return "Unknown"
    }
  }

  public constructor(private measurableService: MeasurableService, private errorService: ErrorService, private dialog: MatDialog, public loginService: LoginService) {}

  ngOnInit() {
    this.loadMeasurables();
  }
}

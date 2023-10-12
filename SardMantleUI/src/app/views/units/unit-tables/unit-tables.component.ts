import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit, UnitTable } from 'src/app/models/units/unit';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { UnitsService } from 'src/app/services/units/units.service';
import { AddEditUnitComponent } from './add-edit-unit/add-edit-unit.component';

@Component({
  selector: 'app-unit-tables',
  templateUrl: './unit-tables.component.html',
  styleUrls: ['./unit-tables.component.scss']
})
export class UnitTablesComponent {
  public unitTables: UnitTable[];
  public searchCriteria: any = {};
  public saving = false;

  displayedColumns: string[] = ['name', 'summary', 'symbol', 'baseUnit', 'amountPerBaseUnit', 'actions'];

  private toDelete: number;

  public addUnit() {
    const dialogRef = this.dialog.open(AddEditUnitComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUnits();
      }
    });
  }

 public editUnit(unit: Unit) {
    this.toDelete = unit.id;
    const dialogRef = this.dialog.open(AddEditUnitComponent, {
      width: '500px',
      data: unit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUnits();
      }
    });
  }

  public deleteUnit(unit: Unit) {
    this.toDelete = unit.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete unit ${unit.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUnitConfirmed();
      }
    });
  }

  public deleteUnitConfirmed() {
    this.saving = true;
    this.unitService.delete(this.toDelete).subscribe(result => {
      this.errorService.showSnackBar("Unit successfully deleted.");
      this.loadUnits();
      this.saving = false;
    }, error => {
      this.errorService.handle(error);
      this.saving = false;
    })
  }

  public loadUnits() {
    this.unitService.getTables(this.searchCriteria).subscribe(data => {
      this.unitTables = data;
      this.unitTables.forEach(table => {
        table.units.forEach(unit => {
          unit.baseUnit = table.units.find(u => u.id == unit.parentId);
        })
      })
    },
    error => {
      this.errorService.handle(error);
    })
  }

  constructor(private errorService: ErrorService,
    private unitService: UnitsService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUnits();
  }
}

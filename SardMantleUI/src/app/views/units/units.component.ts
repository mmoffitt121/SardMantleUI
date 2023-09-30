import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit, UnitTable } from 'src/app/models/units/unit';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { UnitsService } from 'src/app/services/units/units.service';
import { ViewMeasurablesComponent } from './view-measurables/view-measurables.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent {
  public unitTables: UnitTable[];
  public searchCriteria: any = {};
  public saving = false;

  public pageMode: string = "units";
  public pageName: string = "Units";

  displayedColumns: string[] = ['userName', 'viewer', 'editor', 'admin', 'actions'];

  private toDelete: number;

  @ViewChild(ViewMeasurablesComponent) measurablesChild: ViewMeasurablesComponent;

  public setPageMode(mode: string, name: string) {
    this.pageMode = mode;
    this.pageName = name;
  }

  public doAdd() {
    switch (this.pageMode) {
      case 'measurables':
        this.measurablesChild.AddNew();
        break;
      default:
        return;
    }
  }

  constructor(private errorService: ErrorService,
    private unitService: UnitsService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }
}

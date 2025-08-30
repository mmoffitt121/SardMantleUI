import {Component, Inject} from '@angular/core';
import {MapMode, MapModeGroup} from "../../../../models/map/map";
import {take} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MapService} from "../../../../services/map/map.service";
import {ErrorService} from "../../../../services/error.service";

@Component({
  selector: 'app-map-modes-edit',
  templateUrl: './map-modes-edit.component.html',
  styleUrls: ['./map-modes-edit.component.scss']
})
export class MapModesEditComponent {
  public saving: boolean = false
  private mapId: number;
  public mapModeGroups: MapModeGroup[] = [];
  
  public save() {
    this.saving = true;
    this.mapService.putMapModes(this.mapId, this.mapModeGroups).pipe(take(1)).subscribe(result => {
      this.saving = false;
      this.errorService.showSnackBar("Map Modes Updated successfully.");
      this.dialogRef.close(true);
    });
  }
  
  public cancel() {
    this.dialogRef.close();
  }
  
  public add() {
    this.mapModeGroups = [
      ...(this.mapModeGroups ?? []),
      {
        id: 1,
        name: "test",
        icon: "map",
        index: this.mapModeGroups.length,
        mapModes: [],
        selected: false
      } as MapModeGroup
    ];
  }
  
  constructor(
    private dialogRef: MatDialogRef<MapModesEditComponent>,
    private mapService: MapService,
    private errorService: ErrorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.mapModeGroups = data.mapModeGroups ?? [];
    this.mapId = data.mapId;
  }
}

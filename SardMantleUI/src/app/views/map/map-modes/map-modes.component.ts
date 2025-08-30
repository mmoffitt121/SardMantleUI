import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapConfig} from "../map.component";
import {MapService} from "../../../services/map/map.service";
import {take} from "rxjs";
import {MapModeGroup} from "../../../models/map/map";
import {ErrorService} from "../../../services/error.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {MapModesEditComponent} from "./map-modes-edit/map-modes-edit.component";

@Component({
  selector: 'app-map-modes',
  templateUrl: './map-modes.component.html',
  styleUrls: ['./map-modes.component.scss']
})
export class MapModesComponent implements OnInit {
  @Input() mapConfig?: MapConfig;
  @Input() mapId: number;
  
  public loading: boolean = false;
  
  public mapModeGroups: MapModeGroup[];
  
  public editMapModes() {
    const dialogRef = this.dialog.open(MapModesEditComponent, {
      maxWidth: '480px',
      maxHeight: '600px',
      width: '480px',
      data: { mapId: this.mapId, mapModeGroups: this.mapModeGroups },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.init();
      }
    });
  }
  
  private init() {
    this.loading = true;
    this.mapService.getMapModes(this.mapId).pipe(take(1)).subscribe(mapModeGroups => {
      this.mapModeGroups = mapModeGroups;
      this.loading = false;
    });
  }
  
  constructor(
    private mapService: MapService, 
    private errorService: ErrorService,
    private dialog: MatDialog,
  ) {}
  
  ngOnInit(): void {
    this.init();
  }
}

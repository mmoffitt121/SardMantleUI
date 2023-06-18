import { Component, Inject, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Map } from 'src/app/models/map/map';
import { MapEditComponent } from '../map-edit.component';
import { MapService } from 'src/app/services/map/map.service';
import { ErrorService } from 'src/app/services/error.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapTileService } from 'src/app/services/map/map-tile-service';

@Component({
  selector: 'app-map-edit-window',
  templateUrl: './map-edit-window.component.html',
  styleUrls: ['./map-edit-window.component.scss']
})
export class MapEditWindowComponent implements AfterViewInit {
  public map: Map;

  @ViewChild('mapEditComponent') mapEditComponent: MapEditComponent;

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(true);
  }

  public onAdd() {
    this.dialogRef.close("Add");
  }

  public onDelete() {
    this.mapTileService.deleteMapTilesOfMap(this.map.id).subscribe(result => {
      this.mapLayerService.deleteMapLayersOfMapId(this.map.id).subscribe(result => {
        this.mapService.deleteMap(this.map.id).subscribe(result => {
          this.dialogRef.close("Deleted");
          this.errorService.showSnackBar("Map successfully deleted.");
        },
        error => {
          this.errorService.handle(error);
        });
      },
      error => {
        this.errorService.handle(error);
      });
    },
    error => {
      this.errorService.handle(error);
    })
    
  }

  public confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: "Confirm Deletion", content: "Are you sure you want to delete map " + this.mapEditComponent.name.value + "?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete();
      }
    });
  }

  constructor(public dialogRef: MatDialogRef<MapEditWindowComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public mapService: MapService,
    public mapLayerService: MapLayerService,
    private mapTileService: MapTileService,
    public errorService: ErrorService,
    public dialog: MatDialog
    ) { 
    this.map = data.map;
  }

  ngAfterViewInit(): void {
    this.mapEditComponent.setData(this.map);
  }
}

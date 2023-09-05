import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ErrorService } from 'src/app/services/error.service';
import { MapTileService } from 'src/app/services/map/map-tile-service';
import { UploadFileComponent } from '../../shared/document-components/file/upload-file/upload-file.component';
import { Map } from 'src/app/models/map/map';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapTile } from 'src/app/models/map/map-tile';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SignalRService } from 'src/app/services/signal-r/signal-r.service';

@Component({
  selector: 'app-upload-map-tiles',
  templateUrl: './upload-map-tiles.component.html',
  styleUrls: ['./upload-map-tiles.component.scss']
})
export class UploadMapTilesComponent implements OnInit {
  public replaceModeControl = new FormControl();
  public replaceRootControl = new FormControl();
  public loading = false;

  public mapTile: MapTile;
  public map: Map
  public mapLayer: MapLayer;
  public newTile: any;
  public currentUrl: any;

  public uploadProgress = 0;
  public uploadProgressMessage = "Uploading...";

  public onUploadFile() {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '350px',
      data: { title: "Upload Map Tile" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newTile = result;
      }
    });
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.loading = true;
    this.dialogRef.disableClose = true;

  this.mapTileService.postMapTile(
    this.newTile, 
    this.mapTile.z, 
    this.mapTile.x, 
    this.mapTile.y, 
    this.mapTile.layerId,
    this.replaceModeControl.value,
    this.replaceRootControl.value
  ).subscribe(result => {
      this.errorService.showSnackBar("Map Tile Successfully Uploaded.");
      this.loading = false;
      this.dialogRef.close(true);
    },
    error => {
      this.loading = false;
      this.errorService.handle(error);
    })
  }
  

  constructor(private errorService: ErrorService, 
    private domSanitizer: DomSanitizer,
    private mapTileService: MapTileService,
    private signalRService: SignalRService,
    public dialogRef: MatDialogRef<UploadMapTilesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { 
    this.currentUrl = data.root.safeURL;
    this.mapTile = data.root;
    this.map = data.map;
    this.mapLayer = data.mapLayer;
  }

  ngOnInit(): void {
    this.replaceModeControl.setValue("replace-all");
    this.replaceRootControl.setValue(true);

    this.signalRService.startConnection();
    this.signalRService.getProgressUpdates().subscribe(p => {
      this.uploadProgress = p.progress;
      this.uploadProgressMessage = p.message;
    })
  }
}

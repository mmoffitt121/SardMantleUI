import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MapLayer } from 'src/app/models/map/map-layer';
import { ErrorService } from 'src/app/services/error.service';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { UrlService } from 'src/app/services/url/url.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { EditStringComponent } from 'src/app/views/shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from 'src/app/views/shared/document-components/edit/edit-summary/edit-summary.component';
import { UploadFileComponent } from 'src/app/views/shared/document-components/file/upload-file/upload-file.component';

@Component({
  selector: 'app-edit-map-layer',
  templateUrl: './edit-map-layer.component.html',
  styleUrls: ['./edit-map-layer.component.scss']
})
export class EditMapLayerComponent implements AfterViewInit {
  public mapLayer: MapLayer;
  public mapId: number;
  public iconLayer: boolean;
  public baseLayer: boolean;
  public adding: boolean;
  public title: string = "Map Layer";

  public iconChanged = false;
  public icon: any;

  public iconFile: any;

  @ViewChild('name', {static: false}) name: EditStringComponent;
  @ViewChild('summary', {static: false}) summary: EditSummaryComponent;

  public persistentZoomLevels: any[] = [];

  public onSave() {   
    if (this.adding) {
      this.mapLayer = {
        name: this.name.getValue(),
        summary: this.summary.getValue(),
        mapId: this.mapId,
        isBaseLayer: false,
        isIconLayer: this.iconLayer,
        persistentZoomLevels: this.persistentZoomLevels
      } as MapLayer;
      this.mapLayerService.postMapLayer(this.mapLayer).subscribe(result => {
        this.errorService.showSnackBar("Layer " + this.mapLayer.name + " successfully created.");
        this.dialogRef.close(true);

      },
      error => {
        this.errorService.handle(error);
      });
    }
    else {
      let zoomLevels: any = [];
      this.persistentZoomLevels.forEach(z => {
        zoomLevels.push({zoom: z, mapLayerId: this.mapLayer.id});
      })
      this.mapLayer.name = this.name.getValue();
      this.mapLayer.summary = this.summary.getValue();
      this.mapLayer.isBaseLayer = this.baseLayer;
      this.mapLayer.persistentZoomLevels = zoomLevels;
      this.mapLayerService.putMapLayer(this.mapLayer).subscribe(result => {
        this.errorService.showSnackBar("Layer " + this.mapLayer.name + " successfully saved.");
        if (this.iconChanged) {
          this.mapLayerService.postMapLayerIcon(this.icon, this.mapLayer.id).subscribe(result => {
            this.dialogRef.close(true);
            this.errorService.showSnackBar("Map Icon successfully uploaded.");
          }, 
          error => {
            this.errorService.handle(error);
          });
        }
        else {
          this.dialogRef.close(true);
        }
      },
      error => {
        this.errorService.handle(error);
      });
    }
  }

  public onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '480px',
      data: { title: 'Confirm Deletion', content: 'Are you sure you want to delete Map Layer ' + this.mapLayer.name + '?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mapLayerService.deleteMapLayer(this.mapLayer.id).subscribe(result => {
          this.errorService.showSnackBar("Layer successfully deleted.");
          this.dialogRef.close(true);
        },
        error => {
          this.errorService.handle(error);
        });
      }
    });
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onChangeIcon() {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '525px',
      data: { title: "Upload Icon" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.icon = result;
        this.iconChanged = true;
      }
    });
  }

  public onEditTiles() {
    this.dialogRef.close();
    this.router.navigate([this.urlService.getWorld(), 'map-tiles', this.mapLayer.id]);
  }

  constructor(
    public dialogRef: MatDialogRef<EditMapLayerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mapLayerService: MapLayerService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private router: Router,
    private urlService: UrlService,
    private cdref: ChangeDetectorRef
  ) {
    this.mapLayer = data.layer;
    this.adding = data.adding;
    this.title = data.title;
    this.mapId = data.mapId;
    this.iconLayer = data.layerType === "icon";
    this.baseLayer = data.layer?.isBaseLayer;
  }

  ngAfterViewInit(): void {
    if (!this.adding && !(this.mapLayer === undefined)) {
      this.name.setValue(this.mapLayer.name);
      this.summary.setValue(this.mapLayer.summary);
      if (this.mapLayer.persistentZoomLevels && this.mapLayer.persistentZoomLevels.length) {
        this.persistentZoomLevels = [];
        this.mapLayer.persistentZoomLevels.forEach(z => {
          this.persistentZoomLevels.push(z.zoom);
        })
      }
      this.cdref.detectChanges();
    }
  }
}

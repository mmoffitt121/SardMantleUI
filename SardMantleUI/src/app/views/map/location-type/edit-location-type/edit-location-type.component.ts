import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationType } from 'src/app/models/map/location-data-types/location-data-types';
import { ErrorService } from 'src/app/services/error.service';
import { ImageService } from 'src/app/services/image/image.service';
import { MapService } from 'src/app/services/map/map.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { UploadFileComponent } from 'src/app/views/shared/document-components/file/upload-file/upload-file.component';

@Component({
  selector: 'app-edit-location-type',
  templateUrl: './edit-location-type.component.html',
  styleUrls: ['./edit-location-type.component.scss']
})
export class EditLocationTypeComponent implements AfterViewInit {
  public title: string;
  public locationType: LocationType;

  public locationTypes: LocationType[];

  public name = new FormControl();
  public summary = new FormControl();
  public anyTypeParent = new FormControl();
  public zoomProminenceMin = new FormControl();
  public zoomProminenceMax = new FormControl();
  public usesIcon = new FormControl();
  public usesLabel = new FormControl();
  public labelFontSize = new FormControl();
  public labelFontColor = new FormControl();
  public iconSize = new FormControl();

  public parentType: LocationType | undefined;

  public iconChanged = false;
  public icon: any;

  public setParentLocationType(data: any) {
    this.parentType = data;
  }

  public onSave() {
    this.locationType.name = this.name.value;
    this.locationType.summary = this.summary.value;
    this.locationType.anyTypeParent = this.anyTypeParent.value;
    this.locationType.parentTypeId = this.parentType?.id;
    this.locationType.zoomProminenceMin = this.zoomProminenceMin.value;
    this.locationType.zoomProminenceMax = this.zoomProminenceMax.value;
    this.locationType.usesIcon = this.usesIcon.value;
    this.locationType.usesLabel = this.usesLabel.value;
    this.locationType.labelFontSize = this.labelFontSize.value;
    this.locationType.labelFontColor = this.labelFontColor.value;
    this.locationType.iconSize = this.iconSize.value;

    if (this.data.adding) {
      this.mapService.postLocationType(this.locationType).subscribe(result => {
        this.errorService.showSnackBar("Location Type " + this.locationType.name + " successfully added.");
        this.dialogRef.close(true);
      },
      error => {
        this.errorService.handle(error);
      })
    }
    else {
      this.mapService.putLocationType(this.locationType).subscribe(result => {
        this.errorService.showSnackBar("Location Type " + this.locationType.name + " successfully saved.");
        if (this.iconChanged) {
          this.imageService.postImage(this.icon, "something.png", "Location type " + this.locationType.name).subscribe(result => {
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
      })
    }
  }

  public confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: "Confirm Deletion", content: "Are you sure you want to delete location type " + this.locationType.name + "?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete();
      }
    });
  }

  public onDelete() {
    this.mapService.deleteLocationType(this.locationType.id).subscribe(result => {
      this.errorService.showSnackBar(this.locationType.name + " successfully deleted.");
      this.dialogRef.close(true);
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public onChangeIcon() {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '400px',
      data: { title: "Upload Icon" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.icon = result;
        this.iconChanged = true;
      }
    });
  }

  public onCancel() {
    this.dialogRef.close();
  }

  constructor(private mapService: MapService, 
    private errorService: ErrorService, 
    private domSanitizer: DomSanitizer,
    private imageService: ImageService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditLocationTypeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdref: ChangeDetectorRef
  ) {
    if (data.adding) {
      this.title = "Add Location Type"
    }
    else {
      this.title = "Edit Location Type"
    }

    if (data.locationType) {
      this.locationType = {...data.locationType};
    }
    else {
      this.locationType = { usesIcon: true, usesLabel: false } as LocationType;
    }
  }

  ngAfterViewInit(): void {
    this.mapService.getLocationTypes({}).subscribe(data => {
      this.locationTypes = data;
      this.parentType = this.locationTypes.find(l => l.id == this.locationType.parentTypeId);
    },
    error => {
      this.errorService.handle(error);
    })
    this.name.setValue(this.locationType.name);
    this.summary.setValue(this.locationType.summary);
    this.anyTypeParent.setValue(this.locationType.anyTypeParent);
    this.zoomProminenceMin.setValue(this.locationType.zoomProminenceMin);
    this.zoomProminenceMax.setValue(this.locationType.zoomProminenceMax);
    this.usesIcon.setValue(this.locationType.usesIcon);
    this.usesLabel.setValue(this.locationType.usesLabel);
    this.labelFontSize.setValue(this.locationType.labelFontSize);
    this.labelFontColor.setValue(this.locationType.labelFontColor);
    this.iconSize.setValue(this.locationType.iconSize);
    this.cdref.detectChanges();
  }
}

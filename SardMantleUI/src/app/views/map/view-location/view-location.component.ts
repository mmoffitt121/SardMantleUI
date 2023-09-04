import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewHeiarchyComponent } from './view-heiarchy/view-heiarchy.component';
import { Location, LocationDataTypes, LocationType } from '../../../models/map/location-data-types/location-data-types';
import { MapService } from '../../../services/map/map.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { ErrorService } from '../../../services/error.service';
import { EditDocumentLocationsComponent } from '../edit-location/edit-document-locations/edit-document-locations.component';
import { DocumentLocationService } from 'src/app/services/document/document-location.service';
import { RegionService } from 'src/app/services/map/region.service';
import { Region } from 'src/app/models/map/region';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit {
  public selectedMapObject: Location;
  public locationType: LocationType | undefined;
  public dataType: number;
  public dataTypeName: string | undefined;

  public dataPoints: any[];

  public regions: Region[];
  public selectedRegion: Region;
  public editingRegion = false;
  public regionName = new FormControl();
  public showByDefault = new FormControl();
  public color = new FormControl();

  @ViewChild('viewHeiarchy', {static: false}) viewHeiarchy: ViewHeiarchyComponent;

  @Output() editBegin = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() navigate = new EventEmitter();

  @Output() showRegions = new EventEmitter();
  @Output() hideRegions = new EventEmitter();
  @Output() showEdit = new EventEmitter();
  @Output() hideEdit = new EventEmitter();
  @Output() saveRegion = new EventEmitter();

  public editMapObject() {
    this.editBegin.emit();
  }

  public editMapObjectDocuments() {
    const dialogRef = this.dialog.open(EditDocumentLocationsComponent, {
      width: '500px',
      data: {location: this.selectedMapObject}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setSelectedMapObject({id: this.selectedMapObject.id}, -1);
    });
  }

  public confirmDeleteObject() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: "Are you sure you want to delete " +
        (LocationDataTypes.dataTypeMap.get(this.dataType))?.toLowerCase() + " " + 
        (this.dataType == 0 ? this.selectedMapObject.name : this.selectedMapObject.name) + "?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMapObject();
      }
    });
  }

  public deleteMapObject() {
    this.mapService.deleteLocation(this.selectedMapObject.id).subscribe(data => {
      this.deleted.emit();
    },
    error => {
      this.errorHandler.handle(error)
    })
  }

  public handleNavigate(id: number) {
    this.navigate.emit(id);
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.mapService.getLocations({id: model.id}).subscribe(data => {
      if (data.length > 0) {
        this.selectedMapObject = data[0];
        if (this.selectedMapObject.locationTypeId) {
          this.mapService.getLocationTypes({id: this.selectedMapObject.locationTypeId}).subscribe(locTypeData => {
            if (locTypeData.length > 0) {
              this.locationType = locTypeData[0];
            }
            else {
              this.locationType = undefined;
            }
          },
          error => {
            this.errorHandler.handle(error);
          })
        }

        this.loadRegions();
        
        this.documentLocationService.getDataPointsFromLocationId({id: model.id}).subscribe(data => {
          this.dataPoints = data;
        }, error => this.errorHandler.handle(error));
      }
      else {
        this.errorHandler.showSnackBar("Location not found.");
      }
    },
    error => {
      this.errorHandler.handle(error);
    })

    this.viewHeiarchy.setSelectedMapObject(model.id);
  }

  public loadRegions() {
    this.regionService.getRegions({locationId: this.selectedMapObject.id}).subscribe(data => {
      this.regions = data;
      this.regions.forEach(r => r.selected = r.showByDefault);
      this.displayRegions();
    }, error => this.errorHandler.handle(error));
  }

  public onCheckRegion(region: Region) {
    region.selected = !region.selected;
    this.displayRegions();
  }

  public onEditRegion(region: Region) {
    this.editingRegion = true;
    this.selectedRegion = region;
    this.regions.forEach(r => {
      r.selected = r.id == region.id;
    })
    this.displayRegions();
    this.showEdit.emit(region);
    this.cdref.detectChanges();

    this.regionName.setValue(region.name);
    this.showByDefault.setValue(region.showByDefault);
    this.color.setValue(region.color);
  }

  public onAddRegion() {
    let region: Region = {
      id: undefined,
      locationId: this.selectedMapObject.id,
      name: "New Region",
      shape: "",
      showByDefault: false,
      selected: true,
      color: '#0000FF'
    }
    this.regionService.postRegion(region).subscribe(result => {
      this.regionService.getRegions({id: result}).subscribe(data => {
        this.onEditRegion(data[0]);
      }, error => this.errorHandler.handle(error))
    }, error => this.errorHandler.handle(error))
  }

  public displayRegions() {
    let regions = this.regions.filter(r => r.selected && r.shape !== "" && r.shape !== undefined);
    let toDisplay = [] as any;
    regions.forEach(r => {
      toDisplay.push(r);
    })
    this.showRegions.emit(toDisplay);
  }

  public setRegionData(shape: any) {
    if (!(this.regions.filter(r => r.id == this.selectedRegion.id)?.length > 0)) {
      this.regions.push(this.selectedRegion);
    }
    this.selectedRegion.shape = shape;
    this.selectedRegion.selected = true;
    this.displayRegions();
  }

  public onSaveRegion() {
    this.selectedRegion.name = this.regionName.value;
    this.selectedRegion.showByDefault = this.showByDefault.value;
    this.selectedRegion.color = this.color.value?.toHexString();
    this.regionService.putRegion(this.selectedRegion).subscribe(result => {
      this.loadRegions();
      this.hideEdit.emit();
      this.editingRegion = false;
    },
    error => {
      this.errorHandler.handle(error);
    })
  }

  public onDeleteRegion() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: "Are you sure you want to delete " +
        (LocationDataTypes.dataTypeMap.get(this.dataType))?.toLowerCase() + " " + 
        (this.dataType == 0 ? this.selectedMapObject.name : this.selectedMapObject.name) + "?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regionService.deleteRegion(this.selectedRegion?.id ?? -1).subscribe(result => {
          this.loadRegions();
          this.hideEdit.emit();
          this.editingRegion = false;
        }, error => this.errorHandler.handle(error));
      }
    });
  }

  constructor(
    private mapService: MapService, 
    public dialog: MatDialog, 
    private errorHandler: ErrorService,
    private documentLocationService: DocumentLocationService,
    private regionService: RegionService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" } as Location;
  }
}

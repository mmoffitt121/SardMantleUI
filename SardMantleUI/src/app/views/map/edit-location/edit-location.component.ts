import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Area, Subregion, Region, Subcontinent, Continent, CelestialObject } from "../../../models/map/location-data-types/area-data-types";
import { LocationType, Location } from '../../../models/map/location-data-types/location-data-types';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MapService } from '../../../services/map/map.service';
import { ErrorService } from '../../../services/error.service';
import { LocationDataTypes } from '../../../models/map/location-data-types/location-data-types';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from '../../shared/document-components/file/upload-file/upload-file.component';
import { ImageService } from 'src/app/services/image/image.service';
import { ImagePickerComponent } from '../../storage/image-picker/image-picker.component';
import { WorldService } from 'src/app/services/world/world.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
  providers: [ MapService ]
})
export class EditLocationComponent implements OnInit {
  private SAVED_LOCATION_TYPE = 'SavedLocationType';
  private SAVED_LAYER = 'SavedLayer'

  @Input() mapId: number;

  public selectedMapObject = {} as Location;
  public dataType?: number;
  public dataTypeName: string | undefined;
  @Input() editing: boolean = false;

  public name = new FormControl();
  public zoomProminenceMin = new FormControl();
  public zoomProminenceMax = new FormControl();
  public locationType: LocationType;
  public parentLocation: Location | undefined;
  public layer: MapLayer;
  public labelFontSize = new FormControl();
  public labelFontColor = new FormControl();
  public iconSize = new FormControl();

  public markerLat: number;
  public markerLng: number;

  public locationTypes: LocationType[] = [];
  public parentLocations: Location[] = [];
  public layers: MapLayer[];

  public iconChanged = false;
  public icon: string | undefined;

  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public submitOperation() {
    this.complete.emit();
  }

  public cancelOperation() {
    this.cancel.emit();
  }

  public setLocationType(event: any) {
    if (this.locationType?.id != event.id) {
      this.setParent(undefined);
    }
    this.locationType = event;
    this.queryPotentialParents();
    if (this.locationType) {
      localStorage.setItem(`${this.urlService.getWorld()}-${this.SAVED_LOCATION_TYPE}`, this.locationType.id + "");
    }
  }

  public setParent(event: any) {
    this.parentLocation = event;
  }

  public setLayer(event: any) {
    this.layer = event;
    if (this.layer) {
      localStorage.setItem(`${this.urlService.getWorld()}-${this.SAVED_LAYER}`, this.layer.id + "");
    }
  }

  public setSelectedMapObject(obj: any) {
    this.selectedMapObject = obj;
    if (this.editing) {
      this.queryLocation(obj.id).subscribe((data: Location) => {
        this.selectedMapObject = data;
        this.name.setValue(this.selectedMapObject.name);
        this.zoomProminenceMin.setValue(this.selectedMapObject.zoomProminenceMin);
        this.zoomProminenceMax.setValue(this.selectedMapObject.zoomProminenceMax);
        this.labelFontSize.setValue(this.selectedMapObject.labelFontSize);
        this.labelFontColor.setValue(this.selectedMapObject.labelFontColor);
        this.iconSize.setValue(this.selectedMapObject.iconSize);
        this.markerLat = this.selectedMapObject.latitude;
        this.markerLng = this.selectedMapObject.longitude;
        this.icon = this.selectedMapObject.iconURL;
        this.mapService.getLocationTypes({}).subscribe(data => {
          this.locationTypes = data;
          this.locationType = data.find((lt: LocationType) => lt.id == this.selectedMapObject.locationTypeId);
          this.mapLayerService.getMapLayers({mapId: this.mapId, isIconLayer: true}).subscribe(data => {
            this.layers = data;
            this.layer = data.find((l: MapLayer) => l.id == this.selectedMapObject.layerId);
          },
          error => {
            console.error(error);
          });
          if (this.locationType.parentTypeId) {
            let criteria = {};
            if (this.locationType.anyTypeParent) {
              criteria = {}
            }
            else {
              criteria = {locationTypeIds: [this.locationType.parentTypeId]}
            }
            this.mapService.getLocations(criteria).subscribe(data => {
              this.parentLocations = data;
              this.parentLocation = this.parentLocations.find(l => l.id == this.selectedMapObject.parentId);
            },
            error => {
              console.error(error);
            })
          }
        },
        error => {
          console.error(error);
        })
      },
      (error: any) => {
        this.errorHandler.handle(error)
      });
    }
    else {
      this.selectedMapObject = obj;
    }
  }

  public changeDataType(d: number) {
    this.dataType = d;
  }

  public queryLocation(id: number): any {
    return this.mapService.getLocation(id);
  }

  public setMarkerLocations(lat: number, lng: number) {
    this.markerLat = lat;
    this.markerLng = lng;
  }

  public submit() {
    if (this.editing) {
      var location = {
        id: this.selectedMapObject.id,
        name: this.name.value,
        locationTypeId: this.locationType?.id,
        zoomProminenceMin: this.zoomProminenceMin.value,
        zoomProminenceMax: this.zoomProminenceMax.value,
        latitude: this.markerLat,
        longitude: this.markerLng,
        parentId: this.parentLocation?.id,
        layerId: this.layer?.id,
        labelFontColor: this.labelFontColor.value,
        labelFontSize: this.labelFontSize.value,
        iconSize: this.iconSize.value,
        iconURL: this.icon
      } as Location

      this.mapService.putLocation(location).subscribe(result => {
        this.errorHandler.showSnackBar("Location Saved Successfully.");
        this.complete.emit();
      },
      error => {
        this.errorHandler.handle(error);
      })
    }
    else {
      var location = {
        name: this.name.value,
        locationTypeId: this.locationType?.id,
        zoomProminenceMin: this.zoomProminenceMin.value,
        zoomProminenceMax: this.zoomProminenceMax.value,
        latitude: this.markerLat,
        longitude: this.markerLng,
        parentId: this.parentLocation?.id,
        layerId: this.layer?.id,
        labelFontColor: this.labelFontColor.value,
        labelFontSize: this.labelFontSize.value,
        iconSize: this.iconSize.value,
        iconURL: this.icon
      } as Location

      this.mapService.postLocation(location).subscribe(result => {
        this.errorHandler.showSnackBar("Location Saved Successfully.");
        this.complete.emit();
      },
      error => {
        this.errorHandler.handle(error);
      })
    }
  }

  public queryPotentialParents() {
    if (this.locationType.parentTypeId) {
      let criteria = {};
      if (this.locationType.anyTypeParent) {
        criteria = {}
      }
      else {
        criteria = {locationTypeIds: [this.locationType.parentTypeId]}
      }
      this.mapService.getLocations(criteria).subscribe(data => {
        this.parentLocations = data;
      },
      error => {
        console.error(error);
      })
    }
    
  }

  public onChangeIcon() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: 'min(100vw, 700px)',
      height: 'min(100vh, 700px)',
      data: { title: "Upload File" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.icon = result;
        this.iconChanged = true;
      }
    });
  }

  public cancelAddEdit() {
    this.cancel.emit();
  }

  private loadSavedLocationType() {
    const savedLocationType = localStorage.getItem(`${this.urlService.getWorld()}-${this.SAVED_LOCATION_TYPE}`);
    if (savedLocationType) {
      const foundSavedLocationType = this.locationTypes.find(lt => lt.id + "" == savedLocationType);
      if (foundSavedLocationType) {
        this.setLocationType(foundSavedLocationType);
      }
    }
  }

  constructor(
    public mapService: MapService, 
    private errorHandler: ErrorService,
    private mapLayerService: MapLayerService,
    private dialog: MatDialog,
    private imageService: ImageService,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.selectedMapObject = { name: "" } as Location;
    if (!this.editing) {
      this.mapService.getLocationTypes({}).subscribe(data => {
        this.locationTypes = data;
        this.loadSavedLocationType();
        this.mapLayerService.getMapLayers({mapId: this.mapId, isIconLayer: true}).subscribe(data => {
          this.layers = data;
          const savedLayerId = localStorage.getItem(`${this.urlService.getWorld()}-${this.SAVED_LAYER}`);
          let savedLayer = undefined;
          if (savedLayerId) {
            savedLayer = data.find((l: MapLayer) => l.id + "" == savedLayerId);
          }
          this.layer = savedLayer ?? data.find((l: MapLayer) => l.isBaseLayer);
        },
        error => {
          console.error(error);
        });
      },
      error => {
        console.error(error);
      })
    }
  }
}

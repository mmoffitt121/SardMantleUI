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

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss'],
  providers: [ MapService ]
})
export class EditLocationComponent implements OnInit {
  @Input() mapId: number;

  public selectedMapObject = {} as Location;
  public dataType?: number;
  public dataTypeName: string | undefined;
  public editing: boolean = false;

  public name = new FormControl();
  public zoomProminenceMin = new FormControl();
  public zoomProminenceMax = new FormControl();
  public locationType: LocationType;
  public parentLocation: Location;
  public layer: MapLayer;

  public markerLat: number;
  public markerLng: number;

  public locationTypes: LocationType[] = [];
  public parentLocations: LocationType[] = [];
  public layers: MapLayer[];

  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public submitOperation() {
    this.complete.emit();
  }

  public cancelOperation() {
    this.cancel.emit();
  }

  public setLocationType(event: any) {
    this.locationType = event;
  }

  public setParent(event: any) {
    this.parentLocation = event;
  }

  public setLayer(event: any) {
    this.layer = event;
  }

  public setSelectedMapObject(obj: any) {
    this.selectedMapObject = obj;
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
      console.log("editing")
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
        layerId: this.layer?.id
      } as Location

      this.mapService.postLocation(location).subscribe(result => {
        this.errorHandler.showSnackBar("Location Saved Successfully.");
      },
      error => {
        this.errorHandler.handle(error);
      })
    }
  }

  public queryPotentialParents() {
    this.mapService.getLocations({}).subscribe(data => {
      this.parentLocations = data;
    },
    error => {
      console.error(error);
    })
  }

  public cancelAddEdit() {
    this.cancel.emit();
  }

  constructor(
    public mapService: MapService, 
    private errorHandler: ErrorService,
    private mapLayerService: MapLayerService) { }

  ngOnInit(): void {
    this.selectedMapObject = { name: "" } as Location;
    this.mapService.getLocationTypes({}).subscribe(data => {
      this.locationTypes = data;
      this.mapLayerService.getMapLayers({mapId: this.mapId, isIconLayer: true}).subscribe(data => {
        this.layers = data;
        this.layer = data.find((l: MapLayer) => l.isBaseLayer);
        this.queryPotentialParents();
      },
      error => {
        console.error(error);
      })
    },
    error => {
      console.error(error);
    })

    
  }
}

import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Map } from 'src/app/models/map/map';
import { MapService } from 'src/app/services/map/map.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { MapLayerService } from 'src/app/services/map/map-layer.service';

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.scss']
})
export class MapEditComponent {
  private id: number;

  @Input() adding = false;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public name = new FormControl();
  public summary = new FormControl();
  public loops = new FormControl();
  public areaZoomProminence = new FormControl();
  public subregionZoomProminence = new FormControl();
  public regionZoomProminence = new FormControl();
  public subcontinentZoomProminence = new FormControl();
  public continentZoomProminence = new FormControl();
  public defaultZ = new FormControl();
  public defaultX = new FormControl();
  public defaultY = new FormControl();
  public minZoom = new FormControl();
  public maxZoom = new FormControl();
  public isDefault = new FormControl();

  public isValid() {
    var editFieldsValid;
    if (this.adding) {
      editFieldsValid = true;
    }
    else {
      editFieldsValid = this.loops.valid
      && this.areaZoomProminence.valid
      && this.regionZoomProminence.valid
      && this.regionZoomProminence.valid
      && this.subcontinentZoomProminence.valid
      && this.continentZoomProminence.valid
      && this.defaultZ.valid
      && this.defaultX.valid
      && this.defaultY.valid
      && this.minZoom.valid
      && this.maxZoom.valid;
    }

    return this.name.valid 
      && this.isDefault.valid 
      && this.summary.valid
      && editFieldsValid;
  }

  public markAllAsTouched() {
    this.name.markAllAsTouched();
    this.isDefault.markAllAsTouched();
  }

  public setData(map: Map) {
    this.id = map.id;
    this.name.setValue(map.name);
    this.summary.setValue(map.summary);
    this.loops.setValue(map.loops);
    this.areaZoomProminence.setValue(map.areaZoomProminence);
    this.subregionZoomProminence.setValue(map.subregionZoomProminence);
    this.regionZoomProminence.setValue(map.regionZoomProminence);
    this.subcontinentZoomProminence.setValue(map.subcontinentZoomProminence);
    this.continentZoomProminence.setValue(map.continentZoomProminence);
    this.defaultZ.setValue(map.defaultZ);
    this.defaultX.setValue(map.defaultX);
    this.defaultY.setValue(map.defaultY);
    this.minZoom.setValue(map.minZoom);
    this.maxZoom.setValue(map.maxZoom);
    this.isDefault.setValue(map.isDefault);
    this.cdref.detectChanges();
  }

  public buildMapForAdd(): Map {
    return {
      name: this.name.value,
      summary: this.summary.value,
      loops: true,
      areaZoomProminence: 7,
      subregionZoomProminence: 6,
      regionZoomProminence: 5,
      subcontinentZoomProminence: 4,
      continentZoomProminence: 3,
      defaultZ: 3,
      defaultX: 0.0,
      defaultY: 0.0,
      minZoom: 0,
      maxZoom: 10,
      isDefault: this.isDefault.value
    } as Map
  }

  public buildMapForEdit() {
    return {
      id: this.id,
      name: this.name.value,
      summary: this.summary.value,
      loops: this.loops.value,
      areaZoomProminence: this.areaZoomProminence.value,
      subregionZoomProminence: this.subregionZoomProminence.value,
      regionZoomProminence: this.regionZoomProminence.value,
      subcontinentZoomProminence: this.subcontinentZoomProminence.value,
      continentZoomProminence: this.continentZoomProminence.value,
      defaultZ: this.defaultZ.value,
      defaultX: this.defaultX.value,
      defaultY: this.defaultY.value,
      minZoom: this.minZoom.value,
      maxZoom: this.maxZoom.value,
      isDefault: this.isDefault.value,
    } as Map
  }

  public handleSave() {
    if (this.isValid()) {
      if (this.adding) {
        this.mapService.postMap(this.buildMapForAdd()).subscribe(response => {
          this.mapLayerService.postMapLayer({name: "Base Layer", summary: "The foundation layer of this map.", mapId: response, isBaseLayer: true, isIconLayer: false}).subscribe(response => {
            this.errorService.showSnackBar("Map successfully created.");
          },
          error => {
            this.errorService.showSnackBar("The map was successfully created, but there was a problem creating the base layer.");
          });
          this.mapLayerService.postMapLayer({name: "Default Icon Layer", summary: "The default icon layer of this map.", mapId: response, isBaseLayer: true, isIconLayer: true}).subscribe(response => {
          },
          error => {
            this.errorService.showSnackBar("The map was successfully created, but there was a problem creating the base icon layer.");
          });
          
          this.save.emit(response);
        }, 
        error => {
          this.errorService.handle(error);
        });
      } else {
        this.mapService.putMap(this.buildMapForEdit()).subscribe(response => {
          this.errorService.showSnackBar("Map changes successfully saved.");
          this.save.emit(response);
        },
        error => {
          this.errorService.handle(error);
        });
      }
    }
    else {
      this.markAllAsTouched();
      this.errorService.showSnackBar("Please ensure that all fields are valid.");
    }
  }

  constructor (
    public mapService: MapService, 
    public mapLayerService: MapLayerService,
    private errorService: ErrorService, 
    private cdref: ChangeDetectorRef) {
  }
}

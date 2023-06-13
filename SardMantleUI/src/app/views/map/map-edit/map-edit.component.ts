import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Map } from 'src/app/models/map/map';
import { MapService } from 'src/app/services/map/map.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.scss']
})
export class MapEditComponent {
  @Input() adding = false;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public name = new FormControl();
  public summary = new FormControl();
  public isDefault = new FormControl();

  public isValid() {
    return this.name.valid 
      && this.isDefault.valid 
      && this.summary.valid;
  }

  public markAllAsTouched() {
    this.name.markAllAsTouched();
    this.isDefault.markAllAsTouched();
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
      name: this.name.value,
      summary: this.summary.value,
      isDefault: this.isDefault.value
    } as Map
  }

  public handleSave() {
    if (this.isValid()) {
      if (this.adding) {
        this.mapService.postMap(this.buildMapForAdd()).subscribe(response => {
          this.errorService.showSnackBar("Map successfully created.");
          this.save.emit(response);
        }, 
        error => {
          this.errorService.handle(error);
        });
      } else {
        this.mapService.putMap(this.buildMapForEdit()).subscribe(response => {
          this.errorService.showSnackBar("Map changes successfully saved.");
          this.save.emit();
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

  constructor (public mapService: MapService, private errorService: ErrorService, private cdref: ChangeDetectorRef) {
  }
}

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewHeiarchyComponent } from './view-heiarchy/view-heiarchy.component';
import { Location, LocationDataTypes, LocationType } from '../../../models/map/location-data-types/location-data-types';
import { MapService } from '../../../services/map/map.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { ErrorService } from '../../../services/error.service';

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

  @ViewChild('viewHeiarchy', {static: false}) viewHeiarchy: ViewHeiarchyComponent;

  @Output() editBegin = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() navigate = new EventEmitter();

  public editMapObject() {
    this.editBegin.emit();
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

  constructor(private mapService: MapService, public dialog: MatDialog, private errorHandler: ErrorService) { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" } as Location;
  }
}

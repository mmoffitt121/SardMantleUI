import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewHeiarchyComponent } from './view-heiarchy/view-heiarchy.component';
import { LocationDataTypes } from '../models/location-data-types/location-data-types';
import { MapService } from '../map.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css']
})
export class ViewLocationComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;
  public dataTypeName: string | undefined;

  @ViewChild('viewHeiarchy', {static: false}) viewHeiarchy: ViewHeiarchyComponent;

  @Output() editBegin = new EventEmitter();
  @Output() deleted = new EventEmitter();

  public editMapObject() {
    console.log("Editing");
    this.editBegin.emit();
  }

  public confirmDeleteObject() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: "Are you sure you want to delete " +
        (LocationDataTypes.dataTypeMap.get(this.dataType))?.toLowerCase() + " " + 
        (this.dataType == 0 ? this.selectedMapObject.locationName : this.selectedMapObject.name) + "?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMapObject();
      }
    });
  }

  public deleteMapObject() {
    switch (this.dataType) {
      case 0:
        this.mapService.deleteLocation(this.selectedMapObject.id).subscribe(data => {
          this.deleted.emit();
        },
        error => {
          console.error(error);
        })
        break;

      case 1:
        break;

      case 2:
        break;

      case 3:
        break;

      case 4:
        break;
        
      case 5:
        break;
    }
    
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.selectedMapObject = model;
    this.dataType = dataType;
    this.dataTypeName = LocationDataTypes.dataTypeMap.get(dataType);
    this.viewHeiarchy.setSelectedMapObject(model, dataType);
  }

  constructor(private mapService: MapService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ViewHeiarchyComponent } from './view-heiarchy/view-heiarchy.component';
import { LocationDataTypes } from '../models/location-data-types/location-data-types';
import { MapService } from '../map.service';
import { MatDialog, MatDialogModule } from '@angular/material';

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
    /*const dialogRef = this.dialog.open(, {
      
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }

  public deleteMapObject() {
    console.log("Deleting");
    this.mapService.deleteLocation(this.selectedMapObject.id).subscribe(data => {
      this.deleted.emit();
    },
    error => {
      console.error(error);
    })
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.selectedMapObject = model;
    this.dataType = dataType;
    this.dataTypeName = LocationDataTypes.dataTypeMap.get(dataType);
    this.viewHeiarchy.setSelectedMapObject(model, dataType);
  }

  constructor(private mapService: MapService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}

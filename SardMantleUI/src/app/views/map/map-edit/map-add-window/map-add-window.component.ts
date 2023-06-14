import { Component, ViewChild, Inject } from '@angular/core';
import { MapEditComponent } from '../map-edit.component';
import { Map } from 'src/app/models/map/map';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map-add-window',
  templateUrl: './map-add-window.component.html',
  styleUrls: ['./map-add-window.component.scss']
})
export class MapAddWindowComponent {
@ViewChild('mapEditComponent') mapEditComponent: MapEditComponent;

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave(id: number) {
    this.dialogRef.close(id);
  }

  constructor(public dialogRef: MatDialogRef<MapAddWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit(): void { }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewHeiarchyComponent } from './view-heiarchy/view-heiarchy.component';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css']
})
export class ViewLocationComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;

  @ViewChild('viewHeiarchy', {static: false}) viewHeiarchy: ViewHeiarchyComponent;

  public setSelectedMapObject(model: any, dataType: number) {
    console.log(model);
    this.selectedMapObject = model;
    this.dataType = dataType;
    this.viewHeiarchy.setSelectedMapObject(model, dataType);
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-heiarchy',
  templateUrl: './view-heiarchy.component.html',
  styleUrls: ['./view-heiarchy.component.css']
})
export class ViewHeiarchyComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;

  public setSelectedMapObject(model: any, dataType: number) {
    console.log(model);
    this.selectedMapObject = model;
    this.dataType = dataType;
  }
  constructor() { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;

  @Output() editComplete = new EventEmitter();

  public submitEdit() {
    this.editComplete.emit();
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.selectedMapObject = model;
    this.dataType = dataType;
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}

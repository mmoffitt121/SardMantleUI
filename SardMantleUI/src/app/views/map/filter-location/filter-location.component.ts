import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss']
})
export class FilterLocationComponent {
  @Output() add = new EventEmitter();

  public onFilter(event: any) {
    
  }

  public addLocation() {
    this.add.emit();
  }

  constructor() {

  }
}

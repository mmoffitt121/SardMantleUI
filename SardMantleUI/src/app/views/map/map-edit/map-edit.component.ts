import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.css']
})
export class MapEditComponent {
  @Input() adding = false;
}

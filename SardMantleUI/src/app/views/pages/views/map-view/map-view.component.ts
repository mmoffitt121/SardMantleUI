import { Component, Input } from '@angular/core';
import { View } from 'src/app/models/pages/view';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent {
  @Input() view: View;
}

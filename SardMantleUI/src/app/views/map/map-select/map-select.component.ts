import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent {
  public maps: any[] = [];
  
  constructor (private mapService: MapService) { }

  ngOnInit() {
    this.mapService.getMaps({}).subscribe(data => {
      this.maps = data;
    })
  }
}

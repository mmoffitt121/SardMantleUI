import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationType } from 'src/app/models/map/location-data-types/location-data-types';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapService } from 'src/app/services/map/map.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-view-location-param',
  templateUrl: './view-location-param.component.html',
  styleUrls: ['./view-location-param.component.scss']
})
export class ViewLocationParamComponent implements OnInit {
  @Input() location: Location | undefined;
  public locationType: LocationType | undefined;
  public layer: MapLayer | undefined;

  public setValue(location: Location) {
    this.location = location;
    this.mapService.getLocationTypes({id: location.locationTypeId}).subscribe(locType => {
      this.locationType = locType.length > 0 ? locType[0] : undefined;
      this.mapLayerService.getMapLayers({id: location.layerId}).subscribe(layers => {
        this.layer = layers.length > 0 ? layers[0] : undefined;
      }) 
    }) 
  }

  public navigate() {
    this.router.navigate([
      this.urlService.getWorld(), 
      "map", 
      this.layer?.mapId, 
      this.location?.zoomProminenceMin ?? this.locationType?.zoomProminenceMin ?? 6, 
      this.location?.latitude, 
      this.location?.longitude, 
      this.location?.id
    ]);
  }

  constructor (private mapService: MapService, private router: Router, private urlService: UrlService, private mapLayerService: MapLayerService) {}

  ngOnInit() {
    if (this.location !== undefined) {
      this.setValue(this.location);
    }
  }
}

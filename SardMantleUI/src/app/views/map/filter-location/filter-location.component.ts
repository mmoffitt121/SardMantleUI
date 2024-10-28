import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Location } from 'src/app/models/map/location-data-types/location-data-types';
import { LoginService } from 'src/app/services/login/login.service';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.scss']
})
export class FilterLocationComponent {
  @Output() add = new EventEmitter();
  public locations: Location[];

  public length: number = 0;
  public pageSizeOptions = [5, 10, 20, 30];
  public pageIndex: number = 0;
  public pageSize: number = 5;
  public query: string = "";

  public onFilter(event: any) {
    this.query = event ?? "";
    this.mapService.getLocations({pageNumber: this.pageIndex + 1, pageSize: this.pageSize, query: this.query}).subscribe(data => {
      this.locations = data;
    })
    this.mapService.getLocationsCount({query: this.query}).subscribe(data => {
      this.length = data;
    })
  }

  public onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.onFilter(this.query);
  }

  public addLocation() {
    this.add.emit();
  }

  constructor(private mapService: MapService, private mapLayerService: MapLayerService, public loginService: LoginService) {
  }
}

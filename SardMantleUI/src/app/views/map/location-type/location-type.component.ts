import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { LocationType } from 'src/app/models/map/location-data-types/location-data-types';
import { PagedQuery } from 'src/app/models/shared/paged-query';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrls: ['./location-type.component.scss']
})
export class LocationTypeComponent implements OnInit  {
  @Output() filter = new EventEmitter();
  public locationTypes: LocationType[];
  public locationTypeQuery = { pageNumber: 0, pageSize: 5, query: '' };
  public length: number = 0;
  public pageSizeOptions = [5, 7, 10];

  public onPageChange(event: any) {
    this.locationTypeQuery.pageNumber = event.pageIndex;
    this.locationTypeQuery.pageSize = event.pageSize;
    this.load();
  }

  public load() {
    this.mapService.getLocationTypes(this.locationTypeQuery).subscribe(data => {
      this.mapService.getLocationTypeCount({query: this.locationTypeQuery.query}).subscribe(len => {
        this.length = len;
      })
      this.locationTypes = data;
    });
  }

  constructor(public mapService: MapService) {

  }

  ngOnInit(): void {
    this.load();
  }
}

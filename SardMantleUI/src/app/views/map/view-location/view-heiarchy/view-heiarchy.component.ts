import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/models/map/location-data-types/location-data-types';
import { ErrorService } from 'src/app/services/error.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-view-heiarchy',
  templateUrl: './view-heiarchy.component.html',
  styleUrls: ['./view-heiarchy.component.scss']
})
export class ViewHeiarchyComponent implements OnInit {
  public currentItem: Location | undefined;
  public items: Location[];

  @Output() navigate = new EventEmitter();

  public setSelectedMapObject(locationId: any) {
    this.mapService.getLocationHeiarchy(locationId, 10).subscribe(data => {
      if (data && data.length > 0) {
        this.currentItem = data[0];
      }
      if (data && data.length > 1) {
        this.items = data.slice(1).reverse();
      }
      else {
        this.items = [];
      }
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public handleNavigate(id: number) {
    this.navigate.emit(id);
  }

  constructor(private mapService: MapService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.items = [];
  }
}

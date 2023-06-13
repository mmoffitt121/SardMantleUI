import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.scss']
})
export class MapSelectComponent {
  public length: number = 0;
  public pageSizeOptions = [12, 21, 51];
  public pageIndex: number = 0;
  public pageSize: number = 12;
  public maps: any[] = [];

  @Input() formControl = new FormControl();

  public loading = false;

  public loadMaps() {
    this.loading = true;
    this.mapService.getMapCount({ query: this.formControl.value === null ? "" : this.formControl.value }).subscribe(data => {
      this.length = data;
    });
    this.mapService.getMaps({ pageNumber: this.pageIndex, pageSize: this.pageSize, query: this.formControl.value === null ? "" : this.formControl.value }).subscribe(data => {
      this.maps = data;
      this.loading = false;
    },
    error => {
      this.errorHandler.handle(error);
      this.loading = false;
    })
  }

  public onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMaps();
  }
  
  constructor (private mapService: MapService, private errorHandler: ErrorService) { }

  ngOnInit() {
    this.loadMaps();
  }
}

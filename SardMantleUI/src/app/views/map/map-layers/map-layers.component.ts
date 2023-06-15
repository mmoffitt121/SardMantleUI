import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapLayerService } from 'src/app/services/map/map-layer.service';

@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnChanges{
  public selectedLayers: MapLayer[];
  public baseLayer: MapLayer;
  public iconLayers: MapLayer[];
  public mapLayers: MapLayer[];
  
  @Input() mapId: number;
  public length: number = 0;
  public pageSizeOptions = [12, 21, 51];
  public pageIndex: number = 0;
  public pageSize: number = 12;
  public query: string = "";

  public loadLayers() {
    this.mapLayerService.getMapLayers({mapId: this.mapId}).subscribe(data => {
      this.iconLayers = data.filter((l: MapLayer) => l.isIconLayer && !l.isBaseLayer);
      this.mapLayers = data.filter((l: MapLayer) => !l.isIconLayer && !l.isBaseLayer);
      this.baseLayer = data.find((l: MapLayer) => l.isBaseLayer);
    })
  }

  public onCheck(event: any) {
    if (event.isIconLayer) {
      event.selected = !event.selected;
    }
    else {
      this.mapLayers.forEach(l => {
        l.selected = false;
      })
      event.selected = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadLayers();
  }

  constructor(private mapLayerService: MapLayerService, cdref: ChangeDetectorRef) {}
}

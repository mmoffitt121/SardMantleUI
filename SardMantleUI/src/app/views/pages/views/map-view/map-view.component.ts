import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { View } from 'src/app/models/pages/view';
import { ViewCommunicationService } from 'src/app/services/pages/view-communication.service';
import { MapConfig } from 'src/app/views/map/map.component';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent extends DestroyableComponent implements OnInit {
  @Input() view: View;
  private settings: any;
  public mapConfig: MapConfig;
  private selected?: QueriedDataPoint;

  public updateConfig() {
    this.settings = this.view.settings ?? {};
    this.mapConfig = {
      map: this.settings['mapId'] ? Number(this.settings['mapId']) : undefined,
      selectedLayer: this.settings['mapLayer'] ? Number(this.settings['mapLayer']) : undefined,
      iconLayers: this.settings['iconLayers'] ? JSON.parse(this.settings['iconLayers']).map((l: string) => Number(l)) : undefined,
    }

    console.log(this.mapConfig)
  }

  constructor(private service: ViewCommunicationService) {super();}

  ngOnInit(): void {
    this.updateConfig();
    this.service.selected$.pipe(takeUntil(this.destroyed$)).subscribe(selected => {
      this.selected = selected;
      this.updateConfig();
    });
  }
}

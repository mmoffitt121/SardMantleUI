import { Component, Input, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { View } from 'src/app/models/pages/view';
import { DocumentService } from 'src/app/services/document/document.service';
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
  public mapConfig?: MapConfig;
  private selected?: QueriedDataPoint;

  public updateConfig() {
    this.settings = this.view.settings ?? {};
    const locId = this.selected?.locations?.length ? this.selected.locations[0].id : undefined
    this.mapConfig = {
      map: this.settings['mapId'] ? Number(this.settings['mapId']) : undefined,
      selectedLayer: this.settings['mapLayer'] ? Number(this.settings['mapLayer']) : undefined,
      iconLayers: this.settings['iconLayers'] ? JSON.parse(this.settings['iconLayers']).map((l: string) => Number(l)) : undefined,
      selectedLocation: locId,
      openPanelOnSelect: this.settings['locationPanelSelectedBehavior'] === 'open' ? true : false,
      showMapMenuButton: this.settings['showMapMenu'] === 'false' ? false : true,
      showAddLocationButton: this.settings['showAddLocation'] === 'false' ? false : true,
    }
  }

  private alwaysDisplay() {
    return (this.settings.behaviorBeforeSelection ?? "alwaysDisplay") === "alwaysDisplay";
  }

  constructor(private service: ViewCommunicationService, private documentService: DocumentService) {super();}

  ngOnInit(): void {
    this.settings = this.view.settings ?? {};
    if (this.alwaysDisplay()) {
      this.updateConfig();
    }
    if (this.settings.selectionBehavior === "select") {
      this.service.selected$.pipe(takeUntil(this.destroyed$)).subscribe(selected => {
        this.documentService.getDocuments({includeRelevantLocations: true, id: selected?.id}).pipe(take(1)).subscribe(result => {
          this.selected = result.results[0]
          if (this.selected?.locations?.length) {
            this.updateConfig();
          } else if (!this.alwaysDisplay()) {
            this.mapConfig = undefined;
          }
        });
      });
    } else if (!this.alwaysDisplay()) {
      this.updateConfig();
    }
  }
}

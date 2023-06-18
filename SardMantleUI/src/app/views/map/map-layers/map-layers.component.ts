import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapLayer } from 'src/app/models/map/map-layer';
import { ErrorService } from 'src/app/services/error.service';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { EditMapLayerComponent } from './edit-map-layer/edit-map-layer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MapTileService } from 'src/app/services/map/map-tile-service';

@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnChanges{
  public selectedLayers: MapLayer[];
  public allLayers: MapLayer[];
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
      this.allLayers = data;
      this.iconLayers = data.filter((l: MapLayer) => l.isIconLayer);
      this.mapLayers = data.filter((l: MapLayer) => !l.isIconLayer && !l.isBaseLayer);
      this.baseLayer = data.find((l: MapLayer) => !l.isIconLayer && l.isBaseLayer);
      let toSelect = data.find((l: MapLayer) => l.isIconLayer && l.isBaseLayer);
      if (toSelect) {
        toSelect.selected = true;
      }
      this.loadIcons();
    })
  }

  public loadIcons() {
    this.allLayers.forEach(l => {
      this.mapLayerService.getMapLayerIcon(l.id).subscribe(icon => {
        if (icon.body != null) {
          l.safeURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(icon.body));
        }
        else {
          this.mapTileService.getMapTile(0, 0, 0, l.id).subscribe(tile => {
            if (tile.body.size > 0) {
              l.safeURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(tile.body));
            }
            else {
              l.safeURL = undefined;
            }
          })
        }
      });
    })
  }

  public handleAdd(layerType: any) {
    const dialogRef = this.dialog.open(EditMapLayerComponent, {
      width: '400px',
      data: { title: "Add Layer", layerType, adding: true, mapId: this.mapId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLayers();
      }
    });
  }

  public handleEdit(event: any) {
    const dialogRef = this.dialog.open(EditMapLayerComponent, {
      width: '450px',
      data: { title: "Edit Layer", layer: event, mapId: this.mapId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLayers();
      }
    });
  }

  public onCheck(event: any) {
    if (event.isIconLayer) {
      event.selected = !event.selected;
    }
    else {
      const selected = event.selected;
      this.mapLayers.forEach(l => {
        l.selected = false;
      })
      event.selected = !selected;
    }
  }

  public generateBaseLayer() {
    this.mapLayerService.postMapLayer({name: "Base Layer", summary: "The foundation layer of this map.", mapId: this.mapId, isBaseLayer: true, isIconLayer: false}).subscribe(response => {
      this.errorService.showSnackBar("Base Layer successfully created.");
      this.loadLayers();
    },
    error => {
      this.errorService.showSnackBar("There was a problem creating the base layer.");
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadLayers();
  }

  constructor(
    private mapLayerService: MapLayerService, 
    private mapTileService: MapTileService,
    private errorService: ErrorService, 
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer) {}
}

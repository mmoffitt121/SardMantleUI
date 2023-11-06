import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { MapService } from 'src/app/services/map/map.service';
import { Map } from 'src/app/models/map/map';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapTile } from 'src/app/models/map/map-tile';
import { MapTileService } from 'src/app/services/map/map-tile-service';
import { LoginService } from 'src/app/services/login/login.service';

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
  public query: string = "";
  public maps: Map[] = [];

  @Input() formControl = new FormControl();

  @Output() select = new EventEmitter();

  public loading = false;

  public loadMaps() {
    this.loading = true;
    this.mapService.getMapCount({ query: this.query }).subscribe(data => {
      this.length = data;
    });
    this.mapService.getMaps({ pageNumber: this.pageIndex, pageSize: this.pageSize, query: this.query }).subscribe(data => {
      this.maps = data;
      this.loading = false;
      this.maps.forEach(map => {
        this.mapService.getMapIcon(map.id).subscribe(icon => {
          if (icon.body != null) {
            map.url = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(icon.body));
          }
          else {
            this.mapLayerService.getMapLayers({mapId: map.id, baseLayer: true, isIconLayer: false}).subscribe(data => {
              if (data.length > 0) {
                let layerId = data[0].id;
                this.mapTileService.getMapTile(0, 0, 0, layerId).subscribe(data => {
                  if (data.body.size > 0) {
                    map.url = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.body));
                  }
                  else {
                    map.url = null;
                  }
                })
              }
              else {
                map.url = null;
              }
            })
          }
        });
      })
    },
    error => {
      this.errorHandler.handle(error);
      this.loading = false;
    })
  }

  public onSelect(event: any) {
    this.dialogRef.close(event.id);
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onAdd() {
    this.dialogRef.close("Add");
  }

  public onSearch(event: any) {
    this.query = event ? event : '';
    this.loadMaps();
  }

  public onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMaps();
  }
  
  constructor (
    private mapService: MapService, 
    public loginService: LoginService,
    private mapLayerService: MapLayerService,
    private mapTileService: MapTileService,
    private errorHandler: ErrorService, 
    private domSanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<MapSelectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
    this.loadMaps();
  }
}

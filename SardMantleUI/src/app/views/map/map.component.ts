import { Location as RouteLocation } from '@angular/common';
import { MapService } from '../../services/map/map.service';
import { FormControl, Validators } from '@angular/forms';
import { dataMarker, DataMarker } from 'src/app/models/leaflet/leaflet-extensions/data-marker/data-marker';
import { ViewLocationComponent } from './view-location/view-location.component';
import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, AfterViewInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import * as L from 'leaflet';
import 'leaflet-draw';
import { MatDrawer, } from '@angular/material/sidenav';
import { MatSelect } from '@angular/material/select';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { Location, LocationType } from '../../models/map/location-data-types/location-data-types';
import { ActivatedRoute, Router } from '@angular/router';
import { Map as MapData } from 'src/app/models/map/map';
import { MatDialog } from '@angular/material/dialog';
import { MapSelectComponent } from './map-select/map-select.component';
import { MapEditWindowComponent } from './map-edit/map-edit-window/map-edit-window.component';
import { ErrorService } from 'src/app/services/error.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MapAddWindowComponent } from './map-edit/map-add-window/map-add-window.component';
import { MapLayersComponent } from './map-layers/map-layers.component';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapLayerService } from 'src/app/services/map/map-layer.service';
import { MapTileService } from 'src/app/services/map/map-tile-service';
import { LocationTypeComponent } from './location-type/location-type.component';
import { ImageService } from 'src/app/services/image/image.service';
import { UrlService } from 'src/app/services/url/url.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { RegionService } from 'src/app/services/map/region.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login/login.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { ImagePickerComponent } from '../storage/image-picker/image-picker.component';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

export interface MapConfig {
  map?: number;
  selectedLayer?: number;
  iconLayers?: number[];
  selectedLocation?: number;
  x?: number;
  y?: number;
  z?: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ MapService ]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() mapConfig?: MapConfig;
  private map: L.Map;
  private locations: Location[];
  private primaryMarkerLayer: any = L.layerGroup();
  private addMarkerLayer: any = L.layerGroup();
  private drawLayer: any;
  public placing = false;
  public addLocationMarkerIcon = 'add';
  public locationTypes: LocationType[] = [];
  public viewingObject: boolean = false;
  public addingObject: boolean = false;
  public editingObject: boolean = false;

  public selectedLocationId: number;
  public startViewing: boolean = false;

  private defaultCenter: L.LatLng;
  private defaultZoom: number;
  private routedCenter: L.LatLng | undefined;
  private routedZoom: number | undefined;

  private baseLayer: MapLayer | undefined;
  private coverLayer: MapLayer | undefined;
  private defaultIconLayer: MapLayer | undefined;
  public mapData: MapData;
  public mapIconHovered = false;

  public drawControl: any;

  @ViewChild('sideDrawer', {static: false}) drawer: MatDrawer;
  @ViewChild('locationViewer') viewLocationComponent: ViewLocationComponent;
  @ViewChild('locationEditor') editLocationComponent: EditLocationComponent;
  @ViewChild('locationTypeComponent') locationTypeComponent: LocationTypeComponent;
  @ViewChild('mapLayersComponent') mapLayersComponent: MapLayersComponent;

  // #region Add Marker Fields

  @Output() positionChanged = new EventEmitter<{ addMarkerLat: number, addMarkerLng: number }>();
  public addMarkerLat: number;
  public addMarkerLng: number;
  public addName: string;

  addMapDataTypeControl = new FormControl('', []);
  addNameControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  addLocationTypeControl = new FormControl('', []);

  private addLocationDraggableIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });

  @ViewChild('locationTypeSelect') locationTypeSelect: MatSelect;
  private selectedLocationType: LocationType;
  // #endregion

  // Initializes the map
  private initMap(): void {
    this.map = L.map('map', {
      center: this.routedCenter,
      zoom: this.routedZoom
    });

    this.routedCenter = undefined;
    this.routedZoom = undefined;

    if (this.baseLayer) {
      let zoomLevels: any = [];
      zoomLevels.push(this.mapData.minZoom);
      this.baseLayer.persistentZoomLevels?.forEach(zl => zoomLevels.push(zl.zoom));
      for (let i = 0; i < zoomLevels.length; i++) {
        const tilesOuter = L.tileLayer(environment.baseUrl + '/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=' + this.baseLayer?.id + "&worldLocation=" + this.urlService.getWorld(), {
          maxZoom: this.mapData.maxZoom + 5,
          minZoom: zoomLevels[i],
          maxNativeZoom: zoomLevels[i + 1] ?? this.mapData.maxZoom,
          minNativeZoom: zoomLevels[i], 
          noWrap: !this.mapData.loops
        });
        tilesOuter.addTo(this.map);
      }
    }

    if (this.coverLayer) {
      let zoomLevels: any = [];
      zoomLevels.push(this.mapData.minZoom);
      this.coverLayer.persistentZoomLevels?.forEach(zl => zoomLevels.push(zl.zoom));
      for (let i = 0; i < zoomLevels.length; i++) {
        const tilesOuter = L.tileLayer(environment.baseUrl + '/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=' + this.coverLayer?.id + "&worldLocation=" + this.urlService.getWorld(), {
          maxZoom: this.mapData.maxZoom + 5,
          minZoom: zoomLevels[i],
          maxNativeZoom: zoomLevels[i + 1] ?? this.mapData.maxZoom,
          minNativeZoom: zoomLevels[i], 
          noWrap: !this.mapData.loops
        });
        tilesOuter.addTo(this.map);
      }
    }

    this.queryAll();

    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
    });

    this.map.on("moveend", (e: any) => {
      this.queryAll();
      this.updateRoute();
    })
    
    if (this.startViewing) {
      this.navigateToLocation(this.selectedLocationId);
    }

    this.drawLayer = new L.FeatureGroup();
    this.map.addLayer(this.drawLayer);

    this.drawControl = new L.Control.Draw({
      draw: {
        circlemarker: false,
        marker: false,
        rectangle: false,
        circle: false
      },
      edit: {
        featureGroup: this.drawLayer
      }
    })
    
    this.map.on('draw:created', e => {
      let layer = e.layer;
      this.drawLayer.addLayer(layer);
      this.saveRegion();
    });
    
    this.map.on('draw:edited', e => {
      //this.drawLayer.addLayer(e.layer);
      this.saveRegion();
    });
    
    this.map.on('draw:deleted', e => {
      this.saveRegion();
    });
  }

  public navigateToLocation(id: number) {
    this.mapService.getLocations({id}).subscribe(data => {
      if (data && data.length > 0) {
        let l = data[0];
        let zoom = l.zoomProminenceMin + 2;
        if (zoom === undefined || zoom < this.mapData.minZoom) {
          zoom = this.mapData.minZoom;
        } else if (zoom > l.zoomProminenceMax) {
          zoom = l.zoomProminenceMax;
        }
        
        if (l.latitude && l.longitude) {
          this.map.setView([l.latitude, l.longitude], zoom);
        }
        this.openViewLocation(id);
      }
    }, error => {
      this.errorService.handle(error);
    });
  }

  public hideRegions() {
    this.drawLayer.clearLayers();
  }

  public showRegions(regions: any[]) {
    this.hideRegions();
    regions.forEach(region => {
        let geoJSON = L.geoJSON(JSON.parse(region.shape));
        geoJSON.setStyle({fillColor: region.color, color: region.color});
        MapComponent.addNonGroupLayers(geoJSON, this.drawLayer);
    });
  }

  static addNonGroupLayers(sourceLayer: any, targetGroup: any) {
    if (sourceLayer instanceof L.LayerGroup) {
      sourceLayer.eachLayer(function(layer) {
        MapComponent.addNonGroupLayers(layer, targetGroup);
      });
    } else {
      targetGroup.addLayer(sourceLayer);
    }
  }

  public showEdit() {
    this.map.addControl(this.drawControl);
  }

  public hideEdit() {
    this.map.removeControl(this.drawControl);
  }

  public saveRegion() {
    this.viewLocationComponent.setRegionData(JSON.stringify(this.drawLayer.toGeoJSON()));
  }

  public updateRoute() {
    if (this.mapConfig) {
      return;
    }
    var route = this.urlService.getWorld() + '/map/' + this.mapData.id + "/" + this.map.getZoom() + "/" + this.map.getCenter().lat + "/" + this.map.getCenter().lng;
    if (this.viewingObject && this.selectedLocationId) {
      route += "/" + this.selectedLocationId;
    }
    this.routeLocation.replaceState(route);
  }

  // Called when the Add icon is clicked. Creates a movable icon for location creation.
  public addPlaceIcon(coords: any = null): any {
    if (coords != null) {
      this.addMarkerLat = coords.lat;
      this.addMarkerLng = coords.lng;
    }
    else {
      this.addMarkerLat = this.map.getCenter().lat;
      this.addMarkerLng = this.map.getCenter().lng;
    }
    this.addMapDataTypeControl.setValue(null);
    this.addLocationMarkerIcon = 'close';
    this.addMarkerLayer.clearLayers();
    var addMarker = L.marker([this.addMarkerLat, this.addMarkerLng], {draggable: true, icon: this.addLocationDraggableIcon}).addTo(this.addMarkerLayer);
    addMarker.on('drag', (event) => {
      const position = event.target.getLatLng();
      this.onPositionChanged(position.lat, position.lng);
    });
    this.addMarkerLayer.addTo(this.map);

    return addMarker;
  }

  public applyFilter(): void {
    if (this.map === undefined) {
      return;
    }
    this.clearAllMarkerLayers();
    this.queryLocations();
  }

  onPositionChanged(lat: number, lng: number) {
    this.addMarkerLat = lat;
    this.addMarkerLng = lng;
    if (this.editLocationComponent != null) {
      this.editLocationComponent.setMarkerLocations(lat, lng);
    }
  }

  public clearAllMarkerLayers() {
    this.primaryMarkerLayer.clearLayers();
  }

  public layerSelectionChanged(layer: any) {
    if (layer.isIconLayer) {
      this.queryLocations();
      
    }
    else if (layer.selected) {
      this.coverLayer = layer;
      this.loadMap(this.mapData.id);
    }
    else {
      this.coverLayer = undefined;
      this.loadMap(this.mapData.id);
    }
  }

  // #region Group Queries
  public queryLocations() {
    var zoom = this.map.getZoom();

    this.locations = [] as any[];
    let mapLayerIds: any[] = [];
    if (this.mapLayersComponent) {
      for (let l of this.mapLayersComponent?.iconLayers) {
        if (l.selected) {
          mapLayerIds.push(l.id);
        }
      }
    } else {
      if (this.mapConfig?.iconLayers) {
        mapLayerIds = {...mapLayerIds, ...this.mapConfig.iconLayers}
      }
      if (this.defaultIconLayer && !mapLayerIds.includes(this.defaultIconLayer.id)) {
        mapLayerIds.push(this.defaultIconLayer.id);
      }
    }

    let locationTypes = this.locationTypeComponent?.locationTypes?.filter(lt => lt.selected);
    let locationTypeIds = locationTypes.map(lt => lt.id);
    
    this.mapService.getLocations({
      mapLayerIds: mapLayerIds.length > 0 ? mapLayerIds : [-1],
      locationTypeIds: locationTypeIds,
      mapId: this.mapData.id,
      minLatitude: this.map.getBounds().getSouth(),
      maxLatitude: this.map.getBounds().getNorth(),
      minLongitude: this.map.getBounds().getWest(),
      maxLongitude: this.map.getBounds().getEast(),
      minZoom: this.map.getZoom(),
      maxZoom: this.map.getZoom()
    }).subscribe(data => {
      this.locations = data;
      this.primaryMarkerLayer.clearLayers();
      this.addMarkers(this.locations);
    },
    error => {
      console.error(error);
    })
    
  }

  public queryLocationTypes() {
    this.mapService.getLocationTypes([]).subscribe(data => {
      this.locationTypes = data;
    },
    error => {
      console.error(error);
    })
  }
  // #endregion

  public queryAll() {
    this.queryLocations();
    this.showMarkers();
  }

  // #region Specific Queries
  public queryLocation(id: number): any {
    return this.mapService.getLocation(id);
  }
  // #endregion

  public reloadMap() {
    this.clearAllMarkerLayers();
    this.queryLocations();
    this.placing = false;
    this.addLocationMarkerIcon = 'add';
    this.addMarkerLayer.clearLayers();
    this.addNameControl.setValue('');
    this.addNameControl.markAsUntouched();
    this.queryLocationTypes();
    this.showMarkers();
  }

  public reloadPage() {
    window.location.reload();
  }

  public addMarkers(markers: any): void {
    let dotHTML = `<div style='
      height: 7px; width: 7px; 
      background-color: white; 
      border-radius: 50%; 
      outline: black solid 3px; 
      position: absolute; 
      top: 0px; right: 0px; left: 0px; bottom: 0px;'
    >
    </div>`;

    var layer = this.primaryMarkerLayer;
    var newMarker;
    var divIcon;
    let iconHTML;
    let markerHTML;
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      if (!(marker.latitude && marker.longitude)) continue;

      // Set Icon
      if (marker.usesIcon) {
        if (marker.iconURL) {
          iconHTML = `<div><img style='width: ` + (marker.iconSize ?? 32) + `px; margin-top: -50%;' src='` + this.mapService.getIconUrl(marker.iconURL) + `'</div>`;
        } 
        else {
          iconHTML = dotHTML;
        }
      }
      else {
        iconHTML = "";
      }

      // Set Label
      if (marker.usesLabel) {
        let labelColor = marker.labelFontColor ? "#" + marker.labelFontColor : '#FFFFFF';
        let labelSize = marker.labelFontSize ? marker.labelFontSize : "12px";
        let labelStyle = "style='color: " + labelColor + "; font-size: " + labelSize + "px;'";
        markerHTML = "<div " + labelStyle + ">" + marker.name + "</div>";
      }
      else {
        markerHTML = "";
      }
      
      if (!marker.usesLabel && !marker.usesIcon) {
        markerHTML = dotHTML;
      }


      divIcon = L.divIcon({className: 'label-icon-container', html: iconHTML + markerHTML})
      newMarker = dataMarker([marker.latitude, marker.longitude], {icon: divIcon}, marker.id).addTo(layer);
      newMarker.on('click', (e: any) => { this.openViewLocation(e.target.id) });

      layer.addTo(this.map);
    }
  }

  // #region Location

  public openViewLocation(e: any) {
    if (this.editingObject || this.addingObject) { return; }

    var locationData: Location | undefined;
    this.queryLocation(e).subscribe((d: Location) => {
      locationData = d;
      this.selectedLocationId = d.id
      this.viewingObject = true;
      this.changeDetector.detectChanges();
      this.viewLocationComponent.setSelectedMapObject(locationData, 0);
      this.drawer.open();
      this.updateRoute();
    })
  }

  public openEditLocation() {
    var data = this.viewLocationComponent.selectedMapObject;
    this.viewingObject = true;
    this.editingObject = true;
    this.addingObject = false;
    this.changeDetector.detectChanges();
    this.addPlaceIcon({lat: data.latitude, lng: data.longitude});
    this.editLocationComponent.setSelectedMapObject(data);
    this.drawer.open();
  }

  public openAddLocation() {
    this.viewingObject = true;
    this.editingObject = false;
    this.addingObject = true;
    this.changeDetector.detectChanges();
    this.addPlaceIcon();
    this.editLocationComponent.setMarkerLocations(this.addMarkerLat, this.addMarkerLng);
    this.drawer.open();
  }

  public addEditComplete() {
    if (this.addingObject) {
      this.drawer.close();
    }
    else {
      this.openViewLocation({ target: { dataType: this.editLocationComponent.dataType, id: this.editLocationComponent.selectedMapObject.id}});
    }
    this.drawer.close();
    this.addingObject = false;
    this.editingObject = false;
    this.reloadMap();
  }

  public addEditCancel() {
    this.drawer.close();
    this.addingObject = false;
    this.editingObject = false;
    this.addMarkerLayer.clearLayers();
  }

  public editBegin() {
    this.editingObject = true;
    this.openEditLocation();
  }

  public deleteComplete() {
    this.drawer.close();
    this.reloadMap();
  }

  public viewCancel() {
    this.drawer.close();
    this.editingObject = false;
    this.viewingObject = false;
    this.updateRoute();
    this.hideRegions();
    this.hideEdit();
  }

  // #endregion

  public openMapSettings() {
    this.viewingObject = false;
    this.drawer.open();
  }

  public goToDefaultView() {
    this.map.setView([this.mapData.defaultY, this.mapData.defaultX], this.mapData.defaultZ);
  }

  public setDefaultView() {
    this.mapData.defaultZ = this.map.getZoom();
    this.mapData.defaultX = this.map.getCenter().lng;
    this.mapData.defaultY = this.map.getCenter().lat;
    this.mapService.putMap(this.mapData).subscribe(result => {
      this.errorService.showSnackBar("Default map view saved successfully.")
    },
    error => {
      this.errorService.handle(error);
    });
  }

  public showMarkers() {
    var zoom = this.map.getZoom();
  }

  // #region Map Data
  public loadMap(id: number) {
    if (this.map) {
      if (this.mapData.id == id) {
        this.defaultCenter = this.map.getCenter();
        this.defaultZoom = this.map.getZoom();
      }

      this.map.off();
      this.map.remove();
    }
    
    this.mapService.getMaps({id: id}).subscribe(data => {
      if (data.length > 0) {
        this.mapData = data[0];
        if (!this.defaultCenter || !this.defaultZoom) {
          this.defaultCenter = new L.LatLng(this.mapData.defaultY, this.mapData.defaultX);
          this.defaultZoom = this.mapData.defaultZ;
        }
        
        if (this.routedZoom === undefined || this.routedCenter === undefined) {
          this.routedCenter = this.defaultCenter;
          this.routedZoom = this.defaultZoom;
        }
        
        this.loadMapIcon();
        this.mapLayerService.getMapLayers({mapId: id, isBaseLayer: true, isIconLayer: false}).subscribe(data => {
          if (data.length > 0) {
            this.baseLayer = data[0];
          }
          else {
            this.baseLayer = undefined;
          }
          this.mapLayerService.getMapLayers({mapId: id, isBaseLayer: true, isIconLayer: true}).subscribe(data => {
            if (data.length > 0) {
              this.defaultIconLayer = data[0];
            }
            else {
              this.defaultIconLayer = undefined;
            }
            this.initMap();
          },
          error => {
            this.errorService.showSnackBar("There was an error finding the default icon layer.");
          })
        },
        error => {
          this.errorService.showSnackBar("There was an error finding the map base layer.");
        })
      } 
      else {
        this.errorService.showSnackBar("Map not found.");
        this.loadDefaultMap();
      }
    })
  }

  public loadDefaultMap() {
    this.mapService.getMaps({isDefault: true}).subscribe(data => {
      if (data.length > 0) {
        this.loadMap(data[0].id);
      } else {
        this.mapService.getMaps({}).subscribe(nonDefaultData => {
          if (nonDefaultData.length > 0) {
            this.loadMap(nonDefaultData[0].id);
          } else {
            this.router.navigate([this.urlService.getWorld(), 'new-map']);
          }
        })
      }
    })
  }
  
  public changeMap() {
    const dialogRef = this.dialog.open(MapSelectComponent, {
      width: '525px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Add") {
        this.addMap();
      }
      else if (result != null && result > 0) {
        this.router.navigate([this.urlService.getWorld(), 'map', result]);
      }
    });
  }

  public loadMapIcon() {
  }

  public editMapIcon() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: 'min(100vw, 700px)',
      height: 'min(100vh, 700px)',
      data: { title: "Upload File" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mapData.iconId = result;
        this.mapService.putMap(this.mapData).pipe(take(1)).subscribe(result => {
          this.errorService.showSnackBar("Map icon saved successfully.");
        });
      }
    });
  }

  public addMap() {
    const dialogRef = this.dialog.open(MapAddWindowComponent, {
      width: '500px',
      data: { map: this.mapData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMap(result);
      }
    });
  }

  public editMap() {
    const dialogRef = this.dialog.open(MapEditWindowComponent, {
      width: '500px',
      data: { map: this.mapData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Add") {
        this.addMap();
      }
      else if (result === "Deleted") {
        this.loadDefaultMap();
      }
      else if (result) {
        this.loadMap(this.mapData.id);
      }
    });
  }
  // #endregion

  // #region Map Config
  public initConfig() {
    this.loadMap(this.mapConfig!.map!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapConfig']) {
      this.initConfig();
    }
  }
  // #endregion

  constructor(
    private mapService: MapService, 
    private mapLayerService: MapLayerService,
    private mapTileService: MapTileService,
    private imageService: ImageService,
    private errorService: ErrorService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    public router: Router, 
    private routeLocation: RouteLocation,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    public urlService: UrlService,
    private themeService: ThemeService,
    private regionService: RegionService,
    public loginService: LoginService,
    public skeletonService: SkeletonService) { }

  ngOnInit(): void {
    if (this.mapConfig?.map) {
      return;
    }
    this.route.params.subscribe(params => {
      if (params['locationId'] != undefined) {
        this.selectedLocationId = params['locationId'];
        this.startViewing = true;
      }

      if (params['zoom'] != undefined && params['lat'] != undefined && params['lng'] != undefined) {
        try {
          this.routedCenter = new L.LatLng(params['lat'], params['lng']);
          this.routedZoom = params['zoom'];
        }
        catch {}
      }
      
      if (params['mapId']) {
        this.loadMap(params['mapId']);
      }
      else {
        this.mapService.getMaps({isDefault: true}).subscribe(data => {
          if (data.length > 0) {
            this.loadMap(data[0].id);
          } else {
            this.mapService.getMaps({}).subscribe(nonDefaultData => {
              if (nonDefaultData.length > 0) {
                this.loadMap(nonDefaultData[0].id);
              } else {
                this.router.navigate([this.urlService.getWorld(), 'new-map']);
              }
            }, 
            error => {
              this.router.navigate([this.urlService.getWorld(), 'home']);
            })
          }
        }, 
        error => {
          this.router.navigate([this.urlService.getWorld(), 'home']);
        })
      }
    })
  }
}
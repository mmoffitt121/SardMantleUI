import { HttpClient } from '@angular/common/http';
import { MapService } from './map.service';
import { FormControl, Validators } from '@angular/forms';
import { AddLocationComponent } from './add-location/add-location/add-location.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MatDrawer, MatDrawerContainer, MatDrawerToggleResult, MatSelect } from '@angular/material';
import { MapIconMaps } from './models/map-icon-maps/map-icon-maps';

interface LocationType {
  id: number;
  name: string;
}
interface Area {
  id: number;
  name: string;
}
interface Subregion {
  id: number;
  name: string;
}
interface Region {
  id: number;
  name: string;
}
interface Subcontinent {
  id: number;
  name: string;
}
interface Continent {
  id: number;
  name: string;
}
interface CelestialObject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ MapService ]
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589];
  private locations: [];
  private primaryMarkerLayer: any = L.layerGroup();
  private primaryMarkerLayerZoom: number = 6;
  private addMarkerLayer: any = L.layerGroup();
  private areaLayer: any = L.layerGroup();
  private subregionLayer: any = L.layerGroup();
  private regionLayer: any = L.layerGroup();
  private subcontinentLayer: any = L.layerGroup();
  private continentLayer: any = L.layerGroup();
  //private markersCanvas: any = L.MarkersCanvas();
  public placing = false;
  public addLocationMarkerIcon = 'add';
  public locationTypes: LocationType[] = [];

  @Output() positionChanged = new EventEmitter<{ addMarkerLat: number, addMarkerLng: number }>();
  public addMarkerLat: number;
  public addMarkerLng: number;
  public addName: string;

  addMapDataTypeControl = new FormControl('', []);
  addNameControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  addLocationTypeControl = new FormControl('', []);

  public areas: Area[];
  public subregions: Subregion[];
  public regions: Region[];
  public subcontinents: Subcontinent[];
  public continents: Continent[];
  public celestialObjects: CelestialObject[];

  addAreaControl = new FormControl('', []);
  addSubregionControl = new FormControl('', []);
  addRegionControl = new FormControl('', []);
  addSubcontinentControl = new FormControl('', []);
  addContinentControl = new FormControl('', []);
  addCelestialObjectControl = new FormControl('', []);

  private addLocationDraggableIcon = L.icon({
    iconUrl: 'marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });

  @ViewChild('locationTypeSelect') locationTypeSelect: MatSelect;
  @ViewChild('areaSelect') areaSelect: MatSelect;
  @ViewChild('subregionSelect') subregionSelect: MatSelect;
  @ViewChild('regionSelect') regionSelect: MatSelect;
  @ViewChild('subcontinentSelect') subcontinentSelect: MatSelect;
  @ViewChild('continentSelect') continentSelect: MatSelect;
  @ViewChild('celestialObjectSelect') celestialObjectSelect: MatSelect;
  private selectedLocationType: LocationType;

  // Initializes the map
  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tilesOuter = L.tileLayer('https://localhost:7094/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=1', {
      maxZoom: 11,
      minZoom: 0,
      maxNativeZoom: 5
    });

    const tilesInner = L.tileLayer('https://localhost:7094/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=1', {
      maxZoom: 11,
      minZoom: 5,
      maxNativeZoom: 10
    });

    this.queryLocations();

    tilesOuter.addTo(this.map);
    tilesInner.addTo(this.map);

    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
    });
  }

  // Called when the Add icon is clicked. Creates a movable icon for location creation.
  public addPlaceIcon(): void {
    this.addMapDataTypeControl.setValue(null);
    if (this.placing) {
      this.addLocationMarkerIcon = 'add';
      this.addMarkerLayer.clearLayers();
    }
    else {
      this.addMarkerLat = this.map.getCenter().lat;
      this.addMarkerLng = this.map.getCenter().lng;
      this.addLocationMarkerIcon = 'close';
      this.addMarkerLayer.clearLayers();
      var addMarker = L.marker([this.map.getCenter().lat, this.map.getCenter().lng], {draggable: true, icon: this.addLocationDraggableIcon}).addTo(this.addMarkerLayer);
      addMarker.on('drag', (event) => {
        const position = event.target.getLatLng();
        this.onPositionChanged(position.lat, position.lng);
      });
      this.addMarkerLayer.addTo(this.map);
    }
    this.placing = !this.placing;
  }

  public applyFilter(): void {
    this.clearAllMarkerLayers();
    this.queryLocations();
  }

  onPositionChanged(lat: number, lng: number) {
    this.addMarkerLat = lat;
    this.addMarkerLng = lng;
  }

  public clearAllMarkerLayers() {
    this.primaryMarkerLayer.clearLayers();
  }

  public queryLocations() {
    this.mapService.getLocations([]).subscribe(data => {
      this.locations = data;
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

  public queryAreas() {
    this.mapService.getAreas([]).subscribe(data => {
      this.areas = data;
    },
    error => {
      console.error(error);
    })
  }

  public querySubregions() {
    this.mapService.getSubregions([]).subscribe(data => {
      this.subregions = data;
    },
    error => {
      console.error(error);
    })
  }

  public queryRegions() {
    this.mapService.getRegions([]).subscribe(data => {
      this.regions = data;
    },
    error => {
      console.error(error);
    })
  }

  public querySubcontinents() {
    this.mapService.getSubcontinents([]).subscribe(data => {
      this.subcontinents = data;
    },
    error => {
      console.error(error);
    })
  }

  public queryContinents() {
    this.mapService.getContinents([]).subscribe(data => {
      this.continents = data;
    },
    error => {
      console.error(error);
    })
  }

  public queryCelestialObjects() {
    this.mapService.getCelestialObjects([]).subscribe(data => {
      this.celestialObjects = data;
    },
    error => {
      console.error(error);
    })
  }

  public validateAdd() {
    if (this.addNameControl.invalid) {
      this.addNameControl.markAllAsTouched(); // mark all input fields as touched to trigger error messages
      return false;
    }
    return true;
  }

  public createLocation() {
    if (!this.validateAdd()) return;

    switch (this.addMapDataTypeControl.value) {
      // Location
      case "0":
        var locationModel = {
          locationName: this.addNameControl.value,
          areaId: this.areaSelect.value ? this.areaSelect.value.id : null,
          locationTypeId: (this.locationTypeSelect && this.locationTypeSelect.value) ? this.locationTypeSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postLocation(locationModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;

      // Area
      case "1":
        var areaModel = {
          name: this.addNameControl.value,
          subregionId: this.subregionSelect.value ? this.subregionSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postArea(areaModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;

      // Subregion
      case "2":
        var subregionModel = {
          name: this.addNameControl.value,
          regionId: this.regionSelect.value ? this.regionSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postSubregion(subregionModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;

      // Region
      case "3":
        var regionModel = {
          name: this.addNameControl.value,
          subcontinentId: this.subcontinentSelect.value ? this.subcontinentSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postRegion(regionModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;

      // Subcontinent
      case "4":
        var subcontinentModel = {
          name: this.addNameControl.value,
          continentId: this.continentSelect.value ? this.continentSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postSubcontinent(subcontinentModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;

      // Continent
      case "5":
        console.log(this.celestialObjectSelect);
        var continentModel = {
          name: this.addNameControl.value,
          continentId: this.celestialObjectSelect.value ? this.celestialObjectSelect.value.id : null,
          latitude: this.addMarkerLat,
          longitude: this.addMarkerLng
        };
        this.mapService.postContinent(continentModel).subscribe(data => {
          this.handlePosted();
        },
        error => {
          console.error(error);
        })
        break;
    }
  }

  public handlePosted() {
    this.clearAllMarkerLayers();
    this.queryLocations();
    this.placing = false;
    this.addLocationMarkerIcon = 'add';
    this.addMarkerLayer.clearLayers();
    this.addNameControl.setValue('');
    this.addNameControl.markAsUntouched();
    this.queryLocationTypes();
    this.queryAreas();
    this.querySubregions();
    this.queryRegions();
    this.querySubcontinents();
    this.queryContinents();
    this.queryCelestialObjects();
    this.applyDivIcons(this.areas);
  }

  public addMarkers(markers: any): void {
    // Loop through the array and add each marker to the map
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      if (!(marker.latitude && marker.longitude)) continue;

      L.circleMarker([marker.latitude, marker.longitude], { 
        color: MapIconMaps.colorMap.get(marker.locationTypeId), 
        radius: MapIconMaps.radiusMap.get(marker.locationTypeId)
      }).addTo(this.primaryMarkerLayer).bindPopup( 
        `<h3>` + marker.locationName + `</h3>
        <button mat-raised-button (click)="drawer.toggle()" class="map-overlay-button"><mat-icon>menu</mat-icon></button>
        `
      );
      this.primaryMarkerLayer.addTo(this.map);
    }
  }

  public addAreas(): void {
    this.applyDivIcons(this.areas);
  }

  public applyDivIcons(icons: any): void {
    for (var i = 0; i < icons.length; i++) {
      var icon = icons[i];
      if (!(icon.latitude && icon.longitude)) continue;

      L.divIcon({ 
        html: "<div>" + icon.name + "</div>"
      }).addTo(this.areaLayer);
      this.areaLayer.addTo(this.map);
    }
  }

  public showMarkers() {
    var zoom = this.map.getZoom();
    if (zoom < this.primaryMarkerLayerZoom) {
      this.map.removeLayer(this.primaryMarkerLayer);
    }
    else if (!this.map.hasLayer(this.primaryMarkerLayer))
    {
      this.map.addLayer(this.primaryMarkerLayer);
    }
  }
  constructor(private mapService: MapService, private http: HttpClient) { }

  ngOnInit(): void {
    this.queryLocationTypes();
    this.queryAreas();
    this.querySubregions();
    this.queryRegions();
    this.querySubcontinents();
    this.queryContinents();
    this.queryCelestialObjects();
    this.initMap();
    this.map.on("zoomend", (e: any) => {this.showMarkers();});

    /*// Adds a layer
    var ciLayer = L.canvasIconLayer({}).addTo(this.map);

    // Marker definition
    var marker =  L.marker([58.5578, 29.0087]);

    // Adding marker to layer
    ciLayer.addMarker(marker);*/
  }
}
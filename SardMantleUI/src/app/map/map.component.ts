import { HttpClient } from '@angular/common/http';
import { MapService } from './map.service';
import { FormControl, Validators } from '@angular/forms';
import { AddLocationComponent } from './add-location/add-location/add-location.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
import { MatDrawer, MatDrawerContainer, MatDrawerToggleResult, MatOptionSelectionChange, MatSelect } from '@angular/material';
import { MapIconMaps } from './models/map-icon-maps/map-icon-maps';

// #region Interfaces
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
// #endregion

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

  public selectedArea: number = -1;
  public selectedSubregion: number = -1;
  public selectedRegion: number = -1;
  public selectedSubcontinent: number = -1;
  public selectedContinent: number = -1;
  public selectedCelestialObject: number = -1;

  public filteredAreas: Area[];
  public filteredSubregions: Subregion[];
  public filteredRegions: Region[];
  public filteredSubcontinents: Subcontinent[];
  public filteredContinents: Continent[];
  public filteredCelestialObjects: CelestialObject[];

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

  // #region Queries
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
      this.filteredAreas = this.areas;
    },
    error => {
      console.error(error);
    })
  }

  public querySubregions() {
    this.mapService.getSubregions([]).subscribe(data => {
      this.subregions = data;
      this.filteredSubregions = this.subregions;
    },
    error => {
      console.error(error);
    })
  }

  public queryRegions() {
    this.mapService.getRegions([]).subscribe(data => {
      this.regions = data;
      this.filteredRegions = this.regions;
    },
    error => {
      console.error(error);
    })
  }

  public querySubcontinents() {
    this.mapService.getSubcontinents([]).subscribe(data => {
      this.subcontinents = data;
      this.filteredSubcontinents = this.subcontinents;
    },
    error => {
      console.error(error);
    })
  }

  public queryContinents() {
    this.mapService.getContinents([]).subscribe(data => {
      this.continents = data;
      this.filteredContinents = this.continents;
    },
    error => {
      console.error(error);
    })
  }

  public queryCelestialObjects() {
    this.mapService.getCelestialObjects([]).subscribe(data => {
      this.celestialObjects = data;
      this.filteredCelestialObjects = this.celestialObjects;
    },
    error => {
      console.error(error);
    })
  }
  // #endregion

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
    this.selectedArea = -1;
    this.selectedSubregion = -1;
    this.selectedRegion = -1;
    this.selectedSubcontinent = -1;
    this.selectedContinent = -1;
    this.selectedCelestialObject = -1;
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

  // #region Reset Fields
  public resetAreaField() {
    var filter = this.addAreaControl.value ? this.addAreaControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var areasFiltered = this.areas.filter(area => {
        return area.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (areasFiltered.length > 0) {
        this.selectedArea = areasFiltered[0].id;
        this.addAreaControl.setValue(areasFiltered[0].name);
      }
      else {
        areasFiltered = this.areas.filter( area => {
          return area.id == this.selectedArea;
        });
        this.addAreaControl.setValue(areasFiltered[0] != null ? areasFiltered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedArea = -1;
      this.addAreaControl.setValue(null);
    }
  }

  public resetSubregionField() {
    var filter = this.addSubregionControl.value ? this.addSubregionControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.subregions.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedSubregion = filtered[0].id;
        this.addSubregionControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.subregions.filter( item => {
          return item.id == this.selectedSubregion;
        });
        this.addSubregionControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedSubregion = -1;
      this.addSubregionControl.setValue(null);
    }
  }

  public resetRegionField() {
    var filter = this.addRegionControl.value ? this.addRegionControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.regions.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedRegion = filtered[0].id;
        this.addRegionControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.regions.filter( item => {
          return item.id == this.selectedRegion;
        });
        this.addRegionControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedRegion = -1;
      this.addRegionControl.setValue(null);
    }
  }

  public resetSubcontinentField() {
    var filter = this.addSubcontinentControl.value ? this.addSubcontinentControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.subcontinents.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedSubcontinent = filtered[0].id;
        this.addSubcontinentControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.subcontinents.filter( item => {
          return item.id == this.selectedSubcontinent;
        });
        this.addSubcontinentControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedSubcontinent = -1;
      this.addSubcontinentControl.setValue(null);
    }
  }

  public resetContinentField() {
    var filter = this.addContinentControl.value ? this.addContinentControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.continents.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedContinent = filtered[0].id;
        this.addContinentControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.continents.filter( item => {
          return item.id == this.selectedContinent;
        });
        this.addContinentControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedContinent = -1;
      this.addContinentControl.setValue(null);
    }
  }

  public resetCelestialObjectField() {
    var filter = this.addCelestialObjectControl.value ? this.addCelestialObjectControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.celestialObjects.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedCelestialObject = filtered[0].id;
        this.addCelestialObjectControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.celestialObjects.filter( item => {
          return item.id == this.selectedCelestialObject;
        });
        this.addCelestialObjectControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedCelestialObject = -1;
      this.addCelestialObjectControl.setValue(null);
    }
  }
  // endregion

  // #region Select Events
  public selectAreaEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.areas.filter(item => {return item.id == event.source.value})[0];
    this.selectedArea = filtered.id;
    this.addAreaControl.setValue(filtered.name);
  }

  public selectSubregionEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.subregions.filter(item => {return item.id == event.source.value})[0];
    this.selectedSubregion = filtered.id;
    this.addSubregionControl.setValue(filtered.name);
  }

  public selectRegionEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.regions.filter(item => {return item.id == event.source.value})[0];
    this.selectedRegion = filtered.id;
    this.addRegionControl.setValue(filtered.name);
  }

  public selectSubcontinentEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.subcontinents.filter(item => {return item.id == event.source.value})[0];
    this.selectedSubcontinent = filtered.id;
    this.addSubcontinentControl.setValue(filtered.name);
  }

  public selectContinentEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.continents.filter(item => {return item.id == event.source.value})[0];
    this.selectedContinent = filtered.id;
    this.addContinentControl.setValue(filtered.name);
  }

  public selectCelestialObjectEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.celestialObjects.filter(item => {return item.id == event.source.value})[0];
    this.selectedCelestialObject = filtered.id;
    this.addCelestialObjectControl.setValue(filtered.name);
  }
  // #endregion

  // #region Field Filtering
  public filterAreas(filter: string | null) {
    if (filter == null)
    {
      this.filteredAreas = this.areas; 
      return;
    }
    this.filteredAreas = this.areas.filter(area => {
      return area.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterSubregions(filter: string | null) {
    if (filter == null)
    {
      this.filteredSubregions = this.subregions; 
      return;
    }
    this.filteredSubregions = this.subregions.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterRegions(filter: string | null) {
    if (filter == null)
    {
      this.filteredRegions = this.regions; 
      return;
    }
    this.filteredRegions = this.regions.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterSubcontinents(filter: string | null) {
    if (filter == null)
    {
      this.filteredSubcontinents = this.subcontinents; 
      return;
    }
    this.filteredSubcontinents = this.subcontinents.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterContinents(filter: string | null) {
    if (filter == null)
    {
      this.filteredContinents = this.continents; 
      return;
    }
    this.filteredContinents = this.continents.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterCelestialObjects(filter: string | null) {
    if (filter == null)
    {
      this.filteredCelestialObjects = this.celestialObjects; 
      return;
    }
    this.filteredCelestialObjects = this.celestialObjects.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }
  // #endregion

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

    this.addAreaControl.valueChanges.subscribe( data => {
      this.filterAreas(data);
    });
    this.addSubregionControl.valueChanges.subscribe( data => {
      this.filterSubregions(data);
    });
    this.addRegionControl.valueChanges.subscribe( data => {
      this.filterRegions(data);
    });
    this.addSubcontinentControl.valueChanges.subscribe( data => {
      this.filterSubcontinents(data);
    });
    this.addContinentControl.valueChanges.subscribe( data => {
      this.filterContinents(data);
    });
    this.addCelestialObjectControl.valueChanges.subscribe( data => {
      this.filterCelestialObjects(data);
    });
  }
}
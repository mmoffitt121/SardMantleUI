import { HttpClient } from '@angular/common/http';
import { MapService } from './map.service';
import { FormControl, Validators } from '@angular/forms';
import { AddLocationComponent } from './add-location/add-location/add-location.component';
import { dataMarker, DataMarker } from '../leaflet/leaflet-extensions/data-marker/data-marker';
import { ViewLocationComponent } from './view-location/view-location.component';
import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
import { MatDrawer, MatDrawerContainer, MatDrawerToggleResult, MatOptionSelectionChange, MatSelect } from '@angular/material';
import { MapIconMaps } from './models/map-icon-maps/map-icon-maps';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { EditLocationComponent } from './edit-location/edit-location.component';

// #region Interfaces
interface Location {
  id: number;
  locationName: string;
  latitude: number;
  longitude: number;
  areaId: number;
  area: string;
}
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
  private primaryMarkerLayerZoom: number = 8;
  private addMarkerLayer: any = L.layerGroup();
  private areaLayer: any = L.layerGroup();
  private areaLayerZoom: number = 7;
  private subregionLayer: any = L.layerGroup();
  private subregionLayerZoom: number = 6;
  private regionLayer: any = L.layerGroup();
  private regionLayerZoom: number = 5;
  private subcontinentLayer: any = L.layerGroup();
  private subcontinentLayerZoom: number = 4;
  private continentLayer: any = L.layerGroup();
  private continentLayerZoom: number = 2;
  //private markersCanvas: any = L.MarkersCanvas();
  public placing = false;
  public addLocationMarkerIcon = 'add';
  public locationTypes: LocationType[] = [];
  public viewingObject: boolean = false;
  public editingObject: boolean = false;

  @ViewChild('sideDrawer', {static: false}) drawer: MatDrawer;

  @ViewChild('locationViewer') viewLocationComponent: ViewLocationComponent;
  @ViewChild('locationEditor') editLocationComponent: EditLocationComponent;


  // #region Add Marker Fields

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
  // #endregion

  // Initializes the map
  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tilesOuter = L.tileLayer('https://localhost:7094/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=1', {
      maxZoom: 15,
      minZoom: 0,
      maxNativeZoom: 5
    });

    const tilesInner = L.tileLayer('https://localhost:7094/Map/TileProvider/GetTile?z={z}&x={x}&y={y}&layerId=1', {
      maxZoom: 15,
      minZoom: 5,
      maxNativeZoom: 10
    });

    this.queryLocations();
    this.queryAreas();
    this.querySubregions();
    this.queryRegions();
    this.querySubcontinents();
    this.queryContinents();

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
    this.areaLayer.clearLayers();
    this.subregionLayer.clearLayers();
    this.regionLayer.clearLayers();
    this.subcontinentLayer.clearLayers();
    this.continentLayer.clearLayers();
  }

  // #region Group Queries
  public queryLocations() {
    this.mapService.getLocations([]).subscribe(data => {
      this.locations = data;
      this.addMarkers(this.locations, 0);
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
      this.addMarkers(this.areas, 1);
    },
    error => {
      console.error(error);
    })
  }

  public querySubregions() {
    this.mapService.getSubregions([]).subscribe(data => {
      this.subregions = data;
      this.filteredSubregions = this.subregions;
      this.addMarkers(this.subregions, 2);
    },
    error => {
      console.error(error);
    })
  }

  public queryRegions() {
    this.mapService.getRegions([]).subscribe(data => {
      this.regions = data;
      this.filteredRegions = this.regions;
      this.addMarkers(this.regions, 3);
    },
    error => {
      console.error(error);
    })
  }

  public querySubcontinents() {
    this.mapService.getSubcontinents([]).subscribe(data => {
      this.subcontinents = data;
      this.filteredSubcontinents = this.subcontinents;
      this.addMarkers(this.subcontinents, 4);
    },
    error => {
      console.error(error);
    })
  }

  public queryContinents() {
    this.mapService.getContinents([]).subscribe(data => {
      this.continents = data;
      this.filteredContinents = this.continents;
      this.addMarkers(this.continents, 5);
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

  // #region Specific Queries
  public queryLocation(id: number): any {
    return this.mapService.getLocation(id);
  }

  public queryArea(id: number): any {
    return this.mapService.getArea(id);
  }

  public querySubregion(id: number): any {
    return this.mapService.getSubregion(id);
  }

  public queryRegion(id: number): any {
    return this.mapService.getRegion(id);
  }

  public querySubcontinent(id: number): any {
    return this.mapService.getSubcontinent(id);
  }

  public queryContinent(id: number): any {
    return this.mapService.getContinent(id);
  }

  public queryCelestialObject(id: number): any {
    return this.mapService.getCelestialObject(id);
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
          areaId: this.selectedArea != -1 ? this.selectedArea: null,
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
          subregionId: this.selectedSubregion != -1 ? this.selectedSubregion : null,
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
          regionId: this.selectedRegion != -1 ? this.selectedRegion : null,
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
          subcontinentId: this.selectedSubcontinent != -1 ? this.selectedSubcontinent : null,
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
          continentId: this.selectedContinent != -1 ? this.selectedContinent : null,
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
          continentId: this.selectedCelestialObject != -1 ? this.selectedCelestialObject : null,
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
    this.selectedArea = -1;
    this.selectedSubregion = -1;
    this.selectedRegion = -1;
    this.selectedSubcontinent = -1;
    this.selectedContinent = -1;
    this.selectedCelestialObject = -1;
    this.showMarkers();
  }

  public addMarkers(markers: any, dataType: number): void {
    var markerLayer;
    switch (dataType) {
      case 0:
        markerLayer = this.primaryMarkerLayer;
        break;
      case 1:
        markerLayer = this.areaLayer;
        break;
      case 2:
        markerLayer = this.subregionLayer;
        break;
      case 3:
        markerLayer = this.regionLayer;
        break;
      case 4:
        markerLayer = this.subcontinentLayer;
        break;
      case 5:
        markerLayer = this.continentLayer;
        break;
    }
    var newMarker;
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      if (!(marker.latitude && marker.longitude)) continue;

      if (dataType == 0) {
        newMarker = dataMarker([marker.latitude, marker.longitude], { 
          color: MapIconMaps.colorMap.get((marker.locationTypeId)), 
          radius: MapIconMaps.radiusMap.get((marker.locationTypeId))
        }, marker.id, dataType).addTo(markerLayer);
      }
      else {
        newMarker = dataMarker([marker.latitude, marker.longitude], { 
          color: MapIconMaps.nonLocationColorMap.get((dataType)), 
          radius: MapIconMaps.nonLocationRadiusMap.get((dataType))
        }, marker.id, dataType).addTo(markerLayer);
      }

      const popupContent = marker.name != null && marker.name != '' ? marker.name : marker.locationName;
      const popupOptions = { closeButton: false };
      const popup = L.popup().setContent(popupContent);
      
      newMarker.on('click', (e: any) => { this.openEditLocation(e) });
      newMarker.bindPopup(popup, popupOptions).on({
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup();
        }
      })

      markerLayer.addTo(this.map);
    }
  }

  public openEditLocation(e: any) {
    switch (e.target.dataType) {
      case 0:
        var locationData: Location | undefined;
        this.queryLocation(e.target.id).subscribe((d: Location) => {
          locationData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(locationData, 0);
          this.drawer.open();
        })
        break;
      
      case 1:
        var areaData: Area | undefined;
        this.queryArea(e.target.id).subscribe((d: Area) => {
          areaData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(areaData, 1);
          this.drawer.open();
        })
        break;

      case 2:
        var subregionData: Area | undefined;
        this.querySubregion(e.target.id).subscribe((d: Subregion) => {
          subregionData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(subregionData, 2);
          this.drawer.open();
        })
        break;

      case 3:
        var regionData: Area | undefined;
        this.queryRegion(e.target.id).subscribe((d: Area) => {
          regionData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(regionData, 3);
          this.drawer.open();
        })
        break;

      case 4:
        var subcontinentData: Area | undefined;
        this.querySubcontinent(e.target.id).subscribe((d: Area) => {
          subcontinentData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(subcontinentData, 4);
          this.drawer.open();
        })
        break;

      case 5:
        var continentData: Area | undefined;
        this.queryContinent(e.target.id).subscribe((d: Area) => {
          continentData = d;
          this.viewingObject = true;
          this.changeDetector.detectChanges();
          this.viewLocationComponent.setSelectedMapObject(continentData, 5);
          this.drawer.open();
        })
        break;
    }
    
  }

  public editComplete() {
    console.log("Beginning Edit");
    this.editingObject = false;
  }

  public editBegin() {
    console.log("Beginning Edit");
    this.editingObject = true;
  }

  public deleteComplete() {
    this.drawer.close();
    this.handlePosted();
  }

  public viewCancel() {
    this.drawer.close();
    this.editingObject = false;
  }

  public openMapSettings() {
    this.viewingObject = false;
    this.drawer.open();
  }

  public showMarkers() {
    var zoom = this.map.getZoom();
    // Locations
    if (zoom < this.primaryMarkerLayerZoom) {
      this.map.removeLayer(this.primaryMarkerLayer);
    }
    else if (!this.map.hasLayer(this.primaryMarkerLayer)) {
      this.map.addLayer(this.primaryMarkerLayer);
    }
    // Areas
    if (zoom < this.areaLayerZoom) {
      this.map.removeLayer(this.areaLayer);
    }
    else if (!this.map.hasLayer(this.areaLayer)) {
      this.map.addLayer(this.areaLayer);
    }
    // Subregions
    if (zoom < this.subregionLayerZoom) {
      this.map.removeLayer(this.subregionLayer);
    }
    else if (!this.map.hasLayer(this.subregionLayer)) {
      this.map.addLayer(this.subregionLayer);
    }
    // Regions
    if (zoom < this.regionLayerZoom) {
      this.map.removeLayer(this.regionLayer);
    }
    else if (!this.map.hasLayer(this.regionLayer)) {
      this.map.addLayer(this.regionLayer);
    }
    // Subcontinents
    if (zoom < this.subcontinentLayerZoom) {
      this.map.removeLayer(this.subcontinentLayer);
    }
    else if (!this.map.hasLayer(this.subcontinentLayer)) {
      this.map.addLayer(this.subcontinentLayer);
    }
    // Continents
    if (zoom < this.continentLayerZoom) {
      this.map.removeLayer(this.continentLayer);
    }
    else if (!this.map.hasLayer(this.continentLayer)) {
      this.map.addLayer(this.continentLayer);
    }
  }

  //#region Field Resetting
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
  // #endregion

  // #region Field Select Events
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

  constructor(private mapService: MapService, private http: HttpClient, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.queryLocationTypes();
    this.queryCelestialObjects();
    this.initMap();
    this.map.on("zoomend", (e: any) => { this.showMarkers(); });

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
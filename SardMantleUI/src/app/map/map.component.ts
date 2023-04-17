import { HttpClient } from '@angular/common/http';
import { MapService } from './map.service';
import { FormControl, Validators } from '@angular/forms';
import { AddLocationComponent } from './add-location/add-location/add-location.component';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import { MatDrawer, MatDrawerContainer, MatDrawerToggleResult, MatSelect } from '@angular/material';

interface LocationType {
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
  private addMarkerLayer: any = L.layerGroup();
  public placing = false;
  public addLocationMarkerIcon = 'add';
  public locationTypes: LocationType[] = [];

  @Output() positionChanged = new EventEmitter<{ addMarkerLat: number, addMarkerLng: number }>();
  public addMarkerLat: number;
  public addMarkerLng: number;
  public addName: string;

  addNameControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  addLocationTypeControl = new FormControl('', []);

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
      console.log(`You clicked the map at latitude: ${lat} and longitude: ${lng}`);
    });
  }

  // Called when the Add icon is clicked. Creates a movable icon for location creation.
  public addPlaceIcon(): void {
    console.log(this.locationTypes);
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
    this.primaryMarkerLayer.clearLayers();
    this.queryLocations();
  }

  onPositionChanged(lat: number, lng: number) {
    this.addMarkerLat = lat;
    this.addMarkerLng = lng;
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
      console.log(this.locationTypes);
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
    var model = {
      locationName: this.addNameControl.value,
      areaId: null,
      locationTypeId: this.locationTypeSelect.value ? this.locationTypeSelect.value.id : null,
      latitude: this.addMarkerLat,
      longitude: this.addMarkerLng
    };
    console.log(model);
    this.mapService.postLocation(model).subscribe(data => {
      this.queryLocations();
      this.placing = false;
      this.addLocationMarkerIcon = 'add';
      this.addMarkerLayer.clearLayers();
      this.addName = '';
    },
    error => {
      console.error(error);
    })
  }

  public addMarkers(markers: any): void {
    // Loop through the array and add each marker to the map
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      if (!(marker.latitude && marker.longitude)) continue;
      L.circleMarker([marker.latitude, marker.longitude], { color: '#FFFFFF'}).addTo(this.primaryMarkerLayer).bindPopup( "<div> hello </div>" );
      this.primaryMarkerLayer.addTo(this.map);
    }
  }

  public showMarkers() {
    console.log(this);
    var zoom = this.map.getZoom();
    if (zoom < 10) {
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
    this.initMap();
  }
}
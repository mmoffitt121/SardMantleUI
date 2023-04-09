import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; //

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

    var markers = [
      {lat: 44.7316, lng: 8.3763, name: "Preveza"},
      {lat: 46.0046, lng: 5.3173, name: "Minh Vanil"},
      {lat: 40.7128, lng: -74.0060, name: "New York"}
    ];
  
    // Loop through the array and add each marker to the map
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        L.circleMarker([marker.lat, marker.lng], { color: '#FFFFFF'}).addTo(this.map)
            .bindPopup(marker.name);
    }

    tilesOuter.addTo(this.map);
    tilesInner.addTo(this.map);

    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(`You clicked the map at latitude: ${lat} and longitude: ${lng}`);
    });
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
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

    const tiles = L.tileLayer('https://localhost:7094/Map/TileProvider/GetTile?z={z}&x={x}&y={y}', {
      maxZoom: 18,
      minZoom: 0
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

}
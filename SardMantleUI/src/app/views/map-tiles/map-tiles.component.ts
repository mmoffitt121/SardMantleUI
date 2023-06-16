import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MapTile } from 'src/app/models/map/map-tile';
import { MapTileService } from 'src/app/services/map/map-tile-service';

@Component({
  selector: 'app-map-tiles',
  templateUrl: './map-tiles.component.html',
  styleUrls: ['./map-tiles.component.scss']
})
export class MapTilesComponent implements OnInit {
  tiles: MapTile[];
  currentTile: any;
  public viewModeSelectControl = new FormControl();
  public viewModeTiles = 2;

  public loadTiles() {
    this.routeLocation.replaceState('map-tiles/' 
    + this.currentTile.layerId + '/' 
    + this.currentTile.z + '/' 
    + this.currentTile.y + '/' 
    + this.currentTile.x);

    this.mapTileService.getMapTileFromObject(this.currentTile).subscribe(data => {
      if (data.body?.size > 0) {
        this.currentTile.safeURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.body));
      }
    })

    switch (this.viewModeTiles) {
      case 3:
        this.tiles = this.getAdjacentTiles(3);
        break;
      case 5:
        this.tiles = this.getAdjacentTiles(5);
        break;
      case 2:
      default:
        this.tiles = this.getChildTiles();
        break;
    }

    this.tiles.forEach(tile => {
      this.mapTileService.getMapTile(tile.z, tile.x, tile.y, tile.layerId).subscribe(img => {
        if (img.body?.size > 0) {
          tile.safeURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img.body));
        }
      });
    })
  }

  public setTile(tile: MapTile) {
    this.currentTile = tile;
    this.currentTile.selected = false;
    this.loadTiles();
  }

  public getParentTile() {
    let z = this.currentTile.z - 1;
    let x = ~~(this.currentTile.x / 2);
    let y = ~~(this.currentTile.y / 2);
    let layerId = this.currentTile.layerId;
    let selected = false;
    return {z, x, y, layerId, selected} as MapTile
  }

  public getChildTiles() {
    this.tiles = [];
    let z = this.currentTile.z + 1;
    let x = this.currentTile.x * 2;
    let y = this.currentTile.y * 2;
    let layerId = this.currentTile.layerId;
    let selected = false;
    return [
      {z, x,      y,      layerId, selected} as MapTile, 
      {z, x: x+1, y,      layerId, selected} as MapTile, 
      {z, x,      y: y+1, layerId, selected} as MapTile, 
      {z, x: x+1, y: y+1, layerId, selected} as MapTile]
  }

  public getAdjacentTiles(diameter: number) {
    let radius = ~~(diameter / 2);
    let tiles: MapTile[] = [];
    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        let z = this.currentTile.z;
        let x = this.currentTile.x + j;
        let y = this.currentTile.y + i;
        let layerId = this.currentTile.layerId;
        let selected = false;
        tiles.push({z, x: x, y: y, layerId, selected} as MapTile);
      }
    }

    return tiles;
  }

  public setViewMode(event: any) {
    switch (event) {
      case "children":
        this.viewModeTiles = 2;
        break;
      case "adjacent-9":
        this.viewModeTiles = 3;
        break;
      case "adjacent-25":
        this.viewModeTiles = 5;
        break;
    }

    this.loadTiles();
  }

  // #region navigation buttons
  public moveUp() {
    let z = this.currentTile.z;
    let x = this.currentTile.x;
    let y = this.currentTile.y - 1;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public moveDown() {
    let z = this.currentTile.z;
    let x = this.currentTile.x;
    let y = this.currentTile.y + 1;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public moveLeft() {
    let z = this.currentTile.z;
    let x = this.currentTile.x - 1;
    let y = this.currentTile.y;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public moveRight() {
    let z = this.currentTile.z;
    let x = this.currentTile.x + 1;
    let y = this.currentTile.y;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public zoomIn() {
    let z = this.currentTile.z + 1;
    let x = this.currentTile.x * 2;
    let y = this.currentTile.y * 2;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public zoomOut() {
    let z = this.currentTile.z - 1;
    let x = ~~(this.currentTile.x / 2);
    let y = ~~(this.currentTile.y / 2);
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }

  public return() {
    let z = 0;
    let x = 0;
    let y = 0;
    let layerId = this.currentTile.layerId;
    let selected = false;
    this.currentTile = {z, x, y, layerId, selected} as MapTile;
    this.loadTiles();
  }
  // #endregion

  public getFileName() {
    return "Tile-" + this.currentTile.layerId 
    + "-" + this.currentTile.z 
    + "-" + this.currentTile.x 
    + "-" + this.currentTile.y
    + ".png";
  }

  public navigateToMap() {
    this.router.navigate(['map']);
  }

  constructor(
    private domSanitizer: DomSanitizer, 
    private mapTileService: MapTileService,
    private route: ActivatedRoute,
    private router: Router,
    private routeLocation: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      let z = +p['z'] | 0;
      let x = +p['x'] | 0;
      let y = +p['y'] | 0;
      let layerId = +p['layerId'];
      this.currentTile = {z, x, y, layerId} as MapTile;
      this.routeLocation.replaceState('map-tiles/' + layerId + '/' + z + '/' + y + '/' + x);
      this.loadTiles();
    })
    
    this.viewModeSelectControl.setValue("children");
  }
}
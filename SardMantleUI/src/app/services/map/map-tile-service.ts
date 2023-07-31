import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapTile } from 'src/app/models/map/map-tile';
import { SignalRService } from '../signal-r/signal-r.service';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MapTileService {
  public getMapTileFromObject(tile: MapTile) {
      return this.getMapTile(tile.z, tile.x, tile.y, tile.layerId);
  }

  public getMapTile(z: number, x: number, y: number, layerId: number) {
    let params = new HttpParams().set('z', z).set('x', x).set('y', y).set('layerId', layerId).set('worldLocation', this.urlService.getWorld());
    return this.http.get<any>('https://localhost:7094/Map/TileProvider/GetTile', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapTile(
    icon: File, 
    z: number, 
    x: number, 
    y: number, 
    layerId: number, 
    replaceMode: 'fill' | 'replace-all' | undefined, 
    replaceRoot: boolean | undefined
  ) {
    let formData = new FormData();
    formData.append('z', z.toString());
    formData.append('x', x.toString());
    formData.append('y', y.toString());
    formData.append('layerId', layerId.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    if (replaceMode) formData.append('replaceMode', replaceMode);
    if (replaceRoot != null) formData.append('replaceRoot', replaceRoot.toString());
    return this.http.post('https://localhost:7094/Map/TileProvider/UploadTile', formData, { reportProgress: true });
  }

  public deleteMapTile(z: number, x: number, y: number, layerId: number) {
    let params = new HttpParams().set('z', z).set('x', x).set('y', y).set('layerId', layerId);
    return this.http.delete<any>('https://localhost:7094/Map/TileProvider/DeleteTile', { params: params });
  }

  public deleteMapTilesOfLayer(layerId: number) {
    let params = new HttpParams().set('layerId', layerId);
    return this.http.delete<any>('https://localhost:7094/Map/TileProvider/DeleteTilesOfLayer', { params: params });
  }

  public deleteMapTilesOfMap(mapId: number) {
    let params = new HttpParams().set('mapId', mapId);
    return this.http.delete<any>('https://localhost:7094/Map/TileProvider/DeleteTilesOfMap', { params: params });
  }

  constructor(private http: HttpClient, private urlService: UrlService) { }
}

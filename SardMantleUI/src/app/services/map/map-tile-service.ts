import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { MapLayer } from 'src/app/models/map/map-layer';
import { MapTile } from 'src/app/models/map/map-tile';

@Injectable({
  providedIn: 'root'
})
export class MapTileService {
    public getMapTileFromObject(tile: MapTile) {
        return this.getMapTile(tile.z, tile.x, tile.y, tile.layerId);
    }

  public getMapTile(z: number, x: number, y: number, layerId: number) {
    let params = new HttpParams().set('z', z).set('x', x).set('y', y).set('layerId', layerId);
    return this.http.get<any>('https://localhost:7094/Map/TileProvider/GetTile', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapTile(icon: File, id: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post('https://localhost:7094/Map/MapLayer/PostMapLayerIcon', formData);
  }

  constructor(private http: HttpClient) { }
}

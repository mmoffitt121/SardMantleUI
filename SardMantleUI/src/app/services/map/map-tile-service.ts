import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapTile } from 'src/app/models/map/map-tile';
import { UrlService } from '../url/url.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapTileService {
  public getMapTileFromObject(tile: MapTile) {
      return this.getMapTile(tile.z, tile.x, tile.y, tile.layerId);
  }

  public getMapTile(z: number, x: number, y: number, layerId: number) {
    let params = new HttpParams().set('z', z).set('x', x).set('y', y).set('layerId', layerId).set('worldLocation', this.urlService.getWorld());
    return this.http.get<any>(environment.baseUrl + '/Map/TileProvider/GetTile', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapTile(
    icon: File, 
    iconName: string,
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
    formData.append('data', new Blob([icon], { type: icon.type }), iconName);
    if (replaceMode) formData.append('replaceMode', replaceMode);
    if (replaceRoot != null) formData.append('replaceRoot', replaceRoot.toString());
    return this.http.post(environment.baseUrl + '/Map/TileProvider/UploadTile', formData, {});
  }

  public deleteMapTile(z: number, x: number, y: number, layerId: number) {
    let params = new HttpParams().set('z', z).set('x', x).set('y', y).set('layerId', layerId);
    return this.http.delete<any>(environment.baseUrl + '/Map/TileProvider/DeleteTile', { params: params });
  }

  public deleteMapTilesOfLayer(layerId: number) {
    let params = new HttpParams().set('layerId', layerId);
    return this.http.delete<any>(environment.baseUrl + '/Map/TileProvider/DeleteTilesOfLayer', { params: params });
  }

  public deleteMapTilesOfMap(mapId: number) {
    let params = new HttpParams().set('mapId', mapId);
    return this.http.delete<any>(environment.baseUrl + '/Map/TileProvider/DeleteTilesOfMap', { params: params });
  }

  constructor(private http: HttpClient, private urlService: UrlService) { }
}

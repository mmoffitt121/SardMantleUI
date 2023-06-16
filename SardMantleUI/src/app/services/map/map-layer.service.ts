import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { MapLayer } from 'src/app/models/map/map-layer';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {
  public getMapLayers(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Map/MapLayer/GetMapLayers', { params: criteria });
  }

  public getMapLayerCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Map/MapLayer/GetMapLayersCount', { params: criteria });
  }

  public postMapLayer(data: any) {
    return this.http.post('https://localhost:7094/Map/MapLayer/PostMapLayer', data);
  }

  public putMapLayer(data: any) {
    return this.http.put('https://localhost:7094/Map/MapLayer/PutMapLayer', data);
  }

  public deleteMapLayer(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Map/MapLayer/DeleteMapLayer', { params: params });
  }

  public deleteMapLayersOfMapId(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Map/MapLayer/DeleteMapLayersOfMapId', { params: params });
  }

  public getMapLayerIcon(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Map/MapLayer/GetMapLayerIcon', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapLayerIcon(icon: File, id: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post('https://localhost:7094/Map/MapLayer/PostMapLayerIcon', formData);
  }

  constructor(private http: HttpClient) { }
}

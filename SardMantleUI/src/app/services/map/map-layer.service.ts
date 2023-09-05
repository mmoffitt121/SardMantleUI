import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { MapLayer } from 'src/app/models/map/map-layer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {
  public getMapLayers(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Map/MapLayer/GetMapLayers', { params: criteria });
  }

  public getMapLayerCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Map/MapLayer/GetMapLayersCount', { params: criteria });
  }

  public postMapLayer(data: any) {
    return this.http.post(environment.baseUrl + '/Map/MapLayer/PostMapLayer', data);
  }

  public putMapLayer(data: any) {
    return this.http.put(environment.baseUrl + '/Map/MapLayer/PutMapLayer', data);
  }

  public deleteMapLayer(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Map/MapLayer/DeleteMapLayer', { params: params });
  }

  public deleteMapLayersOfMapId(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Map/MapLayer/DeleteMapLayersOfMapId', { params: params });
  }

  public getMapLayerIcon(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>(environment.baseUrl + '/Map/MapLayer/GetMapLayerIcon', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapLayerIcon(icon: File, id: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post(environment.baseUrl + '/Map/MapLayer/PostMapLayerIcon', formData);
  }

  constructor(private http: HttpClient) { }
}

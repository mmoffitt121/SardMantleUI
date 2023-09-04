import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Map

  public getMaps(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Map/GetMaps', { params: criteria });
  }

  public getMapCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Map/GetMapCount', { params: criteria });
  }

  public postMap(map: Map) {
    return this.http.post('https://localhost:7094/Library/Map/PostMap', map);
  }

  public putMap(map: Map) {
    return this.http.put('https://localhost:7094/Library/Map/PutMap', map);
  }

  public deleteMap(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Map/DeleteMap', { params: params });
  }

  public getMapIcon(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Map/GetMapIcon', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapIcon(icon: File, id: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post('https://localhost:7094/Library/Map/PostMapIcon', formData);
  }

  // Location

  public getLocations(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocations', { params: criteria })
  }
  public getLocationsCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocationsCount', { params: criteria })
  }

  public getLocation(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocation', { params: params });
  }

  public getLocationHeiarchy(id: number, depth: number) {
    let params = new HttpParams().set('Id', id).set('Depth', depth);
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocationHeiarchy', { params: params });
  }

  public postLocation(location: any) {
    return this.http.post('https://localhost:7094/Library/Location/PostLocation', location);
  }

  public putLocation(location: any) {
    return this.http.put('https://localhost:7094/Library/Location/PutLocation', location);
  }

  public deleteLocation(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Location/DeleteLocation', { params: params })
  }

  // Location Types

  public getLocationTypes(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/LocationType/GetLocationTypes', { params: criteria });
  }

  public getLocationTypeCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/LocationType/getLocationTypeCount', { params: criteria });
  }

  public postLocationType(data: any) {
    return this.http.post('https://localhost:7094/Library/LocationType/PostLocationType', data);
  }

  public putLocationType(data: any) {
    return this.http.put('https://localhost:7094/Library/LocationType/PutLocationType', data);
  }

  public deleteLocationType(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/LocationType/DeleteLocationType', { params: params });
  }

  constructor(private http: HttpClient) { }
}

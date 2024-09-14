import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'src/app/models/map/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Map

  public getMaps(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Map/GetMaps', { params: criteria });
  }

  public getMapCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Map/GetMapCount', { params: criteria });
  }

  public postMap(map: Map) {
    return this.http.post(environment.baseUrl + '/Library/Map/PostMap', map);
  }

  public putMap(map: Map) {
    return this.http.put(environment.baseUrl + '/Library/Map/PutMap', map);
  }

  public deleteMap(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Map/DeleteMap', { params: params });
  }

  public getMapIcon(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>(environment.baseUrl + '/Library/Map/GetMapIcon', { params: params, observe: 'response', responseType: 'blob' as 'json' });
  }

  public postMapIcon(icon: File, id: number) {
    let formData = new FormData();
    formData.append('id', id.toString());
    formData.append('data', new Blob([icon], { type: icon.type }), "name");
    return this.http.post(environment.baseUrl + '/Library/Map/PostMapIcon', formData);
  }

  // Location

  public getLocations(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Location/GetLocations', { params: criteria })
  }
  public getLocationsCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Location/GetLocationsCount', { params: criteria })
  }

  public getLocation(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>(environment.baseUrl + '/Library/Location/GetLocation', { params: params });
  }

  public getLocationHeiarchy(id: number, depth: number) {
    let params = new HttpParams().set('Id', id).set('Depth', depth);
    return this.http.get<any>(environment.baseUrl + '/Library/Location/GetLocationHeiarchy', { params: params });
  }

  public postLocation(location: any) {
    return this.http.post(environment.baseUrl + '/Library/Location/PostLocation', location);
  }

  public putLocation(location: any) {
    return this.http.put(environment.baseUrl + '/Library/Location/PutLocation', location);
  }

  public deleteLocation(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Location/DeleteLocation', { params: params })
  }

  // Location Types

  public getLocationTypes(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/LocationType/GetLocationTypes', { params: criteria });
  }

  public getLocationTypeCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/LocationType/getLocationTypeCount', { params: criteria });
  }

  public postLocationType(data: any) {
    return this.http.post(environment.baseUrl + '/Library/LocationType/PostLocationType', data);
  }

  public putLocationType(data: any) {
    return this.http.put(environment.baseUrl + '/Library/LocationType/PutLocationType', data);
  }

  public deleteLocationType(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/LocationType/DeleteLocationType', { params: params });
  }

  public getIconUrl(id: string) {
    return "https://localhost:7094/Library/Image/Icon?id=" + id + "&world=adminadmin";
  }

  constructor(private http: HttpClient) { }
}

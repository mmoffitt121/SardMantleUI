import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get<any>('https://localhost:7094/Library/Map/GetMapIcon', { params: params });
  }

  public uploadMapIcon(icon: File, id: number) {
    let params = new HttpParams().set('Id', id);
    this.http.post('https://localhost:7094/Library/Map/PostMapIcon', icon, { params: params })
  }

  // Location

  public getLocations(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocations'/*, { params: criteria }*/)
  }

  public getLocation(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocation', { params: params });
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
    return this.http.get<any>('https://localhost:7094/Library/LocationType/GetLocationTypes');
  }

  // Areas

  public getAreas(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetAreas');
  }

  public getArea(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetArea', { params: params });
  }

  public postArea(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostArea', data);
  }

  public putArea(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutArea', data);
  }

  public deleteArea(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteArea', { params: params })
  }

  // Subregion

  public getSubregions(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetSubregions');
  }

  public getSubregion(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetSubregion', { params: params });
  }

  public postSubregion(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostSubregion', data);
  }

  public putSubregion(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutSubregion', data);
  }

  public deleteSubregion(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteSubregion', { params: params })
  }

  // Region

  public getRegions(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetRegions');
  }

  public getRegion(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetRegion', { params: params });
  }

  public postRegion(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostRegion', data);
  }

  public putRegion(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutRegion', data);
  }

  public deleteRegion(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteRegion', { params: params })
  }

  // Subcontinent

  public getSubcontinents(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetSubcontinents');
  }

  public getSubcontinent(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetSubcontinent', { params: params });
  }

  public postSubcontinent(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostSubcontinent', data);
  }

  public putSubcontinent(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutSubcontinent', data);
  }

  public deleteSubcontinent(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteSubcontinent', { params: params })
  }

  // Continent

  public getContinents(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetContinents');
  }

  public getContinent(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetContinent', { params: params });
  }

  public postContinent(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostContinent', data);
  }

  public putContinent(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutContinent', data);
  }

  public deleteContinent(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteContinent', { params: params })
  }

  // Celestial Object

  public getCelestialObjects(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetCelestialObjects');
  }

  public getCelestialObject(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetCelestialObject', { params: params });
  }

  public postCelestialObject(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostCelestialObject', data);
  }

  public putCelestialObject(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutCelestialObject', data);
  }

  public deleteCelestialObject(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteCelestialObject', { params: params })
  }

  // Celestial System

  public getCelestialSystems(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetCelestialSystems');
  }

  public getCelestialSystem(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetCelestialSystem', { params: params });
  }

  public postCelestialSystem(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostCelestialSystem', data);
  }

  public putCelestialSystem(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutCelestialSystem', data);
  }

  public deleteCelestialSystem(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteCelestialSystem', { params: params })
  }

  // Manifold

  public getManifolds(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Area/GetManifolds');
  }

  public getManifold(id: number) {
    let params = new HttpParams().set('Id', id);
    return this.http.get<any>('https://localhost:7094/Library/Area/GetManifold', { params: params });
  }

  public postManifold(data: any) {
    return this.http.post('https://localhost:7094/Library/Area/PostManifold', data);
  }

  public putManifold(data: any) {
    return this.http.put('https://localhost:7094/Library/Area/PutManifold', data);
  }

  public deleteManifold(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Area/DeleteManifold', { params: params })
  }

  constructor(private http: HttpClient) { }
}

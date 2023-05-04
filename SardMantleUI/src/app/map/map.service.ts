import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

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

  constructor(private http: HttpClient) { }
}

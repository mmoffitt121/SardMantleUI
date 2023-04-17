import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public getLocations(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Location/GetLocations'/*, { params: criteria }*/)
  }

  public postLocation(location: any) {
    return this.http.post('https://localhost:7094/Library/Location/PostLocation', location);
  }

  public getLocationTypes(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/LocationType/GetLocationTypes');
  }

  constructor(private http: HttpClient) { }
}

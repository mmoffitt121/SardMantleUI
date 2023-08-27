import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentLocationService {
  public getDataPointsFromLocationId(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPointLocation/GetDataPointsFromLocationId', { params: criteria })
  }

  public getDataPointsFromLocationIdCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPointLocation/GetDataPointsFromLocationIdCount', { params: criteria })
  }

  public getLocationsFromDataPointId(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPointLocation/GetLocationsFromDataPointId', { params: criteria })
  }

  public getLocationsFromDataPointIdCount(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/DataPointLocation/GetLocationsFromDataPointIdCount', { params: criteria })
  }

  public postDataPointLocation(data: any) {
    return this.http.post('https://localhost:7094/Library/DataPointLocation/PostDataPointLocation', data);
  }

  public deleteDataPointLocation(data: any) {
    return this.http.post('https://localhost:7094/Library/DataPointLocation/DeleteDataPointLocation', data);
  }
  constructor(public http: HttpClient) { }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentLocationService {
  public getDataPointsFromLocationId(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointLocation/GetDataPointsFromLocationId', { params: criteria })
  }

  public getDataPointsFromLocationIdCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointLocation/GetDataPointsFromLocationIdCount', { params: criteria })
  }

  public getLocationsFromDataPointId(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointLocation/GetLocationsFromDataPointId', { params: criteria })
  }

  public getLocationsFromDataPointIdCount(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/DataPointLocation/GetLocationsFromDataPointIdCount', { params: criteria })
  }

  public postDataPointLocation(data: any) {
    return this.http.post(environment.baseUrl + '/Library/DataPointLocation/PutDataPointLocation', data);
  }

  public deleteDataPointLocation(data: any) {
    return this.http.post(environment.baseUrl + '/Library/DataPointLocation/DeleteDataPointLocation', data);
  }
  constructor(public http: HttpClient) { }
}

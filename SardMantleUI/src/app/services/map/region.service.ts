import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  public getRegions(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Region/GetRegions', { params: criteria })
  }

  public postRegion(data: any) {
    return this.http.post(environment.baseUrl + '/Library/Region/PostRegion', data);
  }

  public putRegion(data: any) {
    return this.http.put(environment.baseUrl + '/Library/Region/PutRegion', data);
  }

  public deleteRegion(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Region/DeleteRegion', { params: params })
  }
  constructor(private http: HttpClient) { }
}

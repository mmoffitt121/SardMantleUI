import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  public getRegions(criteria: any) {
    return this.http.get<any>('https://localhost:7094/Library/Region/GetRegions', { params: criteria })
  }

  public postRegion(data: any) {
    return this.http.post('https://localhost:7094/Library/Region/PostRegion', data);
  }

  public putRegion(data: any) {
    return this.http.put('https://localhost:7094/Library/Region/PutRegion', data);
  }

  public deleteRegion(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete('https://localhost:7094/Library/Region/DeleteRegion', { params: params })
  }
  constructor(private http: HttpClient) { }
}

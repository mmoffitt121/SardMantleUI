import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Measurable } from 'src/app/models/units/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurableService {
  public get(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Measurable/Get', { params: criteria });
  }

  public post(measurable: Measurable) {
    return this.http.post(environment.baseUrl + '/Library/Measurable/Post', measurable);
  }

  public put(measurable: Measurable) {
    return this.http.put(environment.baseUrl + '/Library/Measurable/Put', measurable);
  }

  public delete(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Measurable/Delete', { params: params });
  }

  constructor(private http: HttpClient) { }
}

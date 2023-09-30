import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from 'src/app/models/units/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  public getTables(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Unit/GetTables', { params: criteria });
  }

  public get(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Unit/Get', { params: criteria });
  }

  public post(Unit: Unit) {
    return this.http.post(environment.baseUrl + '/Library/Unit/Post', Unit);
  }

  public put(Unit: Unit) {
    return this.http.put(environment.baseUrl + '/Library/Unit/Put', Unit);
  }

  public delete(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Unit/Delete', { params: params });
  }
  constructor(private http: HttpClient) { }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingJsonService {
  public get(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/SettingJSON/Get', { params: criteria });
  }

  public put(data: any) {
    return this.http.put(environment.baseUrl + '/Library/SettingJSON/Put', data);
  }

  public delete(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/SettingJSON/Delete', { params: params });
  }

  constructor(private http: HttpClient) { }
}

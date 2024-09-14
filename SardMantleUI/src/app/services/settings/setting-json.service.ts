import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingJsonService {
  public get(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/SettingJSON/Get', { params: criteria }).pipe(map(items => {
      let result: any[] = [];
      items.forEach((item: any) => {
        result.push({id: item.id, setting: JSON.parse(item.setting)});
      })
      return result;
    }));
  }

  public put(data: any) {
    data = { id: data.id, setting: JSON.stringify(data.setting) }
    return this.http.put(environment.baseUrl + '/Library/SettingJSON/Put', data);
  }

  public delete(id: string) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/SettingJSON/Delete', { params: params });
  }

  constructor(private http: HttpClient) { }
}

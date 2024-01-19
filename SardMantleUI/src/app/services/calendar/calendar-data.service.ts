import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  public get(criteria: any) {
    return this.http.get<any>(environment.baseUrl + '/Library/Calendar/Get', { params: criteria });
  }

  public put(data: any) {
    return this.http.put(environment.baseUrl + '/Library/Calendar/Put', data);
  }

  public delete(id: number) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Calendar/Delete', { params: params });
  }

  constructor(private http: HttpClient) { }
}

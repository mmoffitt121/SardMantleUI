import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewQueryService {
  public query(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/DataPointQuery/Get', data);
  }

  /*public put(data: any) {
    return this.http.put(environment.baseUrl + '/Library/DataPointQuery/Put', data);
  }*/

  constructor(private http: HttpClient) { }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ViewCriteria {
  ids?: string[] | undefined;
  orderBy?: string | undefined;
  descending?: string | undefined;
  pageNumber?: number | undefined;
  pageSize?: number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  public get(data: ViewCriteria) {
    return this.http.post<any>(environment.baseUrl + '/Library/View/Get', data).pipe(
      map((views: any[]) => views.map(
        view => ({...view, settings: view.settings ? JSON.parse(view.settings) : undefined})
      )));
  }

  public getCount(data: ViewCriteria) {
    return this.http.post<any>(environment.baseUrl + '/Library/View/GetCount', data);
  }

  public put(data: any) {
    data.settings = JSON.stringify(data.settings);
    return this.http.put(environment.baseUrl + '/Library/View/Put', data);
  }

  public delete(id: string) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/View/Delete', { params: params })
  }

  constructor(private http: HttpClient) { }
}

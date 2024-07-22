import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageCriteria } from 'src/app/models/pages/page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public get(data: PageCriteria) {
    return this.http.post<any>(environment.baseUrl + '/Library/Page/GetPages', data);
  }

  public getCount(data: PageCriteria) {
    return this.http.post<any>(environment.baseUrl + '/Library/Page/GetPageCount', data);
  }

  public put(data: any) {
    data.settings = JSON.stringify(data.settings);
    return this.http.put(environment.baseUrl + '/Library/Page/PutPage', data);
  }

  public delete(id: string) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Page/DeletePage', { params: params })
  }

  constructor(private http: HttpClient) { }
}

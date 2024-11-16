import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Page, PageCriteria, PageElement } from 'src/app/models/pages/page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public get(data: PageCriteria) {
    return this.http.get<Page[]>(environment.baseUrl + '/Library/Page/GetPages', { params: data as any }).pipe(map(result => {
      result.forEach(i => {
        this.denormalizeObjectTypes(i.root);
      })
      return result;
    }));
  }

  public getDefault() {
    return this.http.get<any>(environment.baseUrl + '/Library/Page/GetDefaultPage');
  }

  public getCount(data: PageCriteria) {
    return this.http.get<any>(environment.baseUrl + '/Library/Page/GetPageCount', { params: data as any });
  }

  public getPageObjects() {
    return this.http.get<any>(environment.baseUrl + '/Library/Page/GetPageObjects');
  }

  public put(data: any) {
    data.pageData = undefined;
    this.normalizeObjectTypes(data.root);
    data.settings = JSON.stringify(data.settings);
    return this.http.put(environment.baseUrl + '/Library/Page/PutPage', data);
  }

  private normalizeObjectTypes(elem: PageElement) {
    if (elem) {
      elem.objectType = elem?.objectType?.replace(" ", '');
      elem.children?.forEach(child => {
        this.normalizeObjectTypes(child);
      })
    }
  }

  private denormalizeObjectTypes(elem: PageElement) {
    if (elem) {
      elem.objectType = elem?.objectType?.replace(/([A-Z])/g, ' $1').trim();
      if (!elem.children) {
        elem.children = [];
      }
      elem.children?.forEach(child => {
        this.denormalizeObjectTypes(child);
      })
    }
  }

  public delete(id: string) {
    let params = new HttpParams().set("Id", id);
    return this.http.delete(environment.baseUrl + '/Library/Page/DeletePage', { params: params })
  }

  constructor(private http: HttpClient) { }
}

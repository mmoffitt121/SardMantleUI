import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  public get() {
    return this.http.get<any>(environment.baseUrl + '/Library/MenuItem/Get');
  }

  public put(data: any) {
    return this.http.put(environment.baseUrl + '/Library/MenuItem/Put', data);
  }

  public getConfigurableMenuItems() {
    return this.http.get<any>(environment.baseUrl + '/Library/MenuItem/GetConfigurableMenuItems');
  }

  public putConfigurableMenuItems(data: any) {
    return this.http.put(environment.baseUrl + '/Library/MenuItem/PutConfigurableMenuItems', data);
  }

  public getPossiblePaths() {
    return this.http.get<any>(environment.baseUrl + '/Library/Page/GetPossiblePaths');
  }

  constructor(private http: HttpClient) { }
}

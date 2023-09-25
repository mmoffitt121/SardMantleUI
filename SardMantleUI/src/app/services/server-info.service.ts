import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { World } from 'src/app/models/world/world';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerInfoService {
  public getServerInfo() {
    return this.http.get<any>(environment.baseUrl + '/Library/ServerInfo/GetServerVersion');
  }
  constructor(private http: HttpClient) { }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public getServerVersion() {
    return this.http.get<any>(environment.baseUrl + '/Library/Database/GetServerVersion');
  }

  public getDatabases() {
    return this.http.get<any>(environment.baseUrl + '/Library/Database/GetDatabases');
  }

  constructor(public http: HttpClient) { }
}

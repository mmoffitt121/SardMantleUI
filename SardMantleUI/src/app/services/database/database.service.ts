import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public getServerVersion() {
    return this.http.get<any>('https://localhost:7094/Library/Database/GetServerVersion');
  }

  public getDatabases() {
    return this.http.get<any>('https://localhost:7094/Library/Database/GetDatabases');
  }

  constructor(public http: HttpClient) { }
}

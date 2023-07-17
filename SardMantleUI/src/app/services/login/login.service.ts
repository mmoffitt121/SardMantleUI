import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public postUser(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Account/PostUser', data)
  }
  public postPassword(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Account/PostPassword', data)
  }
  public putPassword(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Account/PutPassword', data)
  }
  
  constructor(private http: HttpClient) { }
}

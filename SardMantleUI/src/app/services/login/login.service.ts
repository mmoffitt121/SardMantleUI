import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public postUser(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Account/PostUser', data)
  }
  public putPassword(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Account/PutPassword', data)
  }
  public login(data: any) {
    return this.http.post<any>('https://localhost:7094/Library/Login/Login/Login', data)
  }
  public getUser(username: string) {
    return this.http.get<any>('https://localhost:7094/Library/Login/GetUser/GetUser', {params: {username}})
  }

  public logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }

  public isLoggedIn() {
    return this.isUserAuthenticated();
    /*if (localStorage.getItem("token")) {
      return true;
    }
    return false;*/
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
 
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
  
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }
}

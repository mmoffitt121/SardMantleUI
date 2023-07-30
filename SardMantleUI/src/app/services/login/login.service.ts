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

  public setLoginTokens(token: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  public logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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

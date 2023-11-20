import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public postUser(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/Account/PostUser', data)
  }
  public putPassword(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/Account/PutPassword', data)
  }
  public changePassword(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/Account/ChangePassword', data)
  }
  public login(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/Login/Login/Login', data)
  }
  public getUser(username: string) {
    return this.http.get<any>(environment.baseUrl + '/Library/Login/GetUser/GetUser', {params: {username}})
  }
  public getUsers() {
    return this.http.get<any>(environment.baseUrl + '/Library/Account/GetUsers')
  }
  public deleteUser(username: string) {
    return this.http.delete<any>(environment.baseUrl + '/Library/Account/DeleteUser', {params: {username}})
  }
  public assignRole(username: string, roleName: string) {
    let params = new HttpParams().set('username', username).set('roleName', roleName);
    return this.http.post(environment.baseUrl + '/Library/Role/AssignRole', {username, roleName})
  }
  public unassignRole(username: string, roleName: string) {
    let params = new HttpParams().set('username', username).set('roleName', roleName);
    return this.http.post(environment.baseUrl + '/Library/Role/UnassignRole', {username, roleName})
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

  public userHasAnyOfRoles(roles: string[]) {
    if (!roles || !roles.length) { return true; }
    let userRoles = localStorage.getItem('roles')?.split(',');
    if (!userRoles || !userRoles.length || !this.isLoggedIn()) { return false; }

    let result = false;
    userRoles.forEach(ur => {
      roles.forEach(r => {
        if (ur === r) {
          result = true;
        }
      })
    })
    return result;
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

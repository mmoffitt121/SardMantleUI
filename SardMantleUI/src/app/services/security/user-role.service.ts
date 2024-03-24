import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  public get() {
    return this.http.get<any>(environment.baseUrl + '/Library/LibraryUserRole/Get', {params: {}})
  }
  public put(userId: string, roles: string[]) {
    return this.http.put<any>(environment.baseUrl + '/Library/LibraryUserRole/Put', roles, {params: {user: userId}})
  }
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }
}

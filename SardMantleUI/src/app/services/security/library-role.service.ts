import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryRoleService {
  public get(userId: string | undefined) {
    let params = userId ? {id: userId} : undefined
    return this.http.get<any>(environment.baseUrl + '/Library/LibraryRole/Get', {params: params})
  }
  public getPermissions() {
    return this.http.get<any>(environment.baseUrl + '/Library/LibraryRole/GetPermissions')
  }
  public put(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/LibraryRole/Put', data)
  }
  public delete(userId: string) {
    return this.http.delete<any>(environment.baseUrl + '/Library/LibraryRole/Delete', {params: {id: userId}})
  }
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }
}

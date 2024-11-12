import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {
  private permissions = new BehaviorSubject<string[]>([]);
  private currentWorld = new BehaviorSubject<string>('');
  private globalRoles = new BehaviorSubject<string[]>([]);
  private userName = new BehaviorSubject<string>('');

  public permissions$ = this.permissions.asObservable();
  public currentWorld$ = this.currentWorld.asObservable();
  public globalRoles$ = this.globalRoles.asObservable();
  public userName$ = this.userName.asObservable();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
  public resetPassword(data: any) {
    return this.http.post<any>(environment.baseUrl + '/Library/Account/ResetPassword', data);
  }
  public assignRole(username: string, roleName: string) {
    let params = new HttpParams().set('username', username).set('roleName', roleName);
    return this.http.post(environment.baseUrl + '/Library/Role/AssignRole', {username, roleName})
  }
  public unassignRole(username: string, roleName: string) {
    let params = new HttpParams().set('username', username).set('roleName', roleName);
    return this.http.post(environment.baseUrl + '/Library/Role/UnassignRole', {username, roleName})
  }
  public getUserPermissions() {
    return this.http.get(environment.baseUrl + '/Library/LibraryRole/GetUserPermissions');
  }

  public loggedIn() {
    this.userName.next(localStorage.getItem('username') ?? '');
  }

  public logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    this.userName.next('');
  }

  public loadPermissions() {
    if (this.urlService.getWorld() == '') {
      this.permissions.next([]);
      return;
    }

    this.getUserPermissions().subscribe(permissions => {
      this.permissions.next(permissions as string[]);
    })
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
  
  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private router: Router, private urlService: UrlService) { 
    router.events.pipe(takeUntil(this.destroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.urlService.getWorld() !== this.currentWorld.value) {
          this.currentWorld.next(this.urlService.getWorld());
        }
      }
    })

    this.currentWorld$.pipe(takeUntil(this.destroyed$)).subscribe(world => {
      this.loadPermissions();

      if (this.isUserAuthenticated()) {
        this.userName.next(localStorage.getItem("username") ?? '');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this.loginService.isUserAuthenticated()) {
      return true;
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    
    return false;
  } 

  constructor(private loginService: LoginService, private router: Router){}
}
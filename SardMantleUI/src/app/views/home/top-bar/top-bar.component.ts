import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public userLoggedIn: boolean = false;
  public username: string | undefined;

  public navigateLogIn() {
    this.router.navigate(['login']);
  }
  public navigateRegister() {
    this.router.navigate(['register']);
  }
  public navigateHome() {
    this.router.navigate(['home']);
  }
  public navigateUserSettings() {
    this.router.navigate(['user-settings']);
  }
  public navigateWorldManager() {
    this.router.navigate(['world-manager']);
  }

  constructor(public router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.userLoggedIn = this.loginService.isLoggedIn();
    this.username = localStorage['username'];
  }
}

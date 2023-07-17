import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
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

  constructor(public router: Router) { }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  public logOut() {
    this.loginService.logOut();
    this.router.navigate(["home"]);
  }

  constructor(private router: Router, private loginService: LoginService) {}
}

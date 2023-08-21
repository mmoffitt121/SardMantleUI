import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userName = new FormControl();
  public password = new FormControl();

  public canSubmit() {
    return this.userName.value && this.password.value;
  }

  public logIn() {
    this.loginService.login({userName: this.userName.value, password: this.password.value}).subscribe(data => {
      if (data.isAuthSuccessful) {
        localStorage.setItem("token", data.token);
        this.loginService.getUser(this.userName.value).subscribe(data => {
          localStorage.setItem("username", data.userName);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("roles", data.roles);
          this.router.navigate(["home"]);
        })
      }
      else {
        this.errorService.showSnackBar("Login unsuccessful.");
      }
    },
    error => {
      this.errorService.handle(error);
    });
  }

  constructor(private loginService: LoginService, private errorService: ErrorService, private router: Router) {}
}

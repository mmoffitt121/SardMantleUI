import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {
  public userName = new FormControl();
  public email = new FormControl();
  public password = new FormControl();
  public confirmPassword = new FormControl();

  public canLogIn() {
    return this.userName.value 
      && this.email.value 
      && this.password.value 
      && this.confirmPassword.value 
      && this.password.value === this.confirmPassword.value;
  }

  public register() {
    if (this.canLogIn()) {
      this.loginService.postUser({userName: this.userName.value, email: this.email.value}).subscribe(result => {
        this.loginService.postPassword({userName: this.userName.value, password: this.password.value}).subscribe(result => {
          this.errorService.showSnackBar("Account successfully created.");
          this.router.navigate(['user-settings']);
        })
      }, error => {
        this.errorService.handle(error);
      });
    }
    
  }

  constructor(private loginService: LoginService, private errorService: ErrorService, private router: Router) {}
}

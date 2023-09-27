import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public user: any;

  public logOut() {
    this.loginService.logOut();
    this.router.navigate(["home"]);
  }

  public changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      data: { 
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUser();
      }
    });
  }

  private loadUser() {
    this.loginService.getUser(localStorage.getItem('username') ?? '').pipe(take(1)).subscribe(result => this.user = result);
  }

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUser();
  }
}

import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  public user: any;

  public oldPassword = new FormControl();
  public pass1 = new FormControl();
  public pass2 = new FormControl();

  public canSubmit() {
    return this.pass1.value == this.pass2.value && this.oldPassword.value && this.pass1.value;
  }

  public submit() {
    this.loginService.changePassword({
      userName: this.user.userName,
      oldPassword: this.oldPassword.value,
      newPassword: this.pass1.value
    }).pipe(take(1)).subscribe(resp => {
      this.errorService.showSnackBar("Password succesfully changed.");
      this.dialogRef.close();
    }, error => this.errorService.handle(error)); 
  }

  public cancel() {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.user = this.data.user;
  }
}

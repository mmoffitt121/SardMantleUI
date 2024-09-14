import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Permission } from 'src/app/models/security/library-role-permissions';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent {
  @Input() title: string;
  @Input() nameKey: string;
  @Input() selectionKeys: string[];
  @Input() selectionKeyHeaders: string[];

  public users: any[];

  public onCancel() {
    this.dialogRef.close();
  }

  public onAdd(user: any) {
    this.dialogRef.close(user);
  }

  constructor(public dialogRef: MatDialogRef<SelectUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService) { }

  ngOnInit(): void {
    this.title = this.data.title;

    this.loginService.getUsers().pipe().subscribe(data => {
      this.users = data
      this.users = this.users.sort((a, b) => a.userName.localeCompare(b.userName))
    });
    
  }
}

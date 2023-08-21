import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {
  public dat = [];
  public saving = false;

  displayedColumns: string[] = ['userName', 'viewer', 'editor', 'admin', 'actions'];

  public toggle(user: any, role: any) {
    this.saving = true;

    if (user.roles.includes(role)) {
      this.loginService.unassignRole(user.userName, role).subscribe(result => { 
        this.loadUsers();
        this.saving = false;
      },
      error => {
        this.errorService.handle(error);
        this.saving = false;
      })
    }
    else {
      this.loginService.assignRole(user.userName, role).subscribe(result => { 
        this.loadUsers();
        this.saving = false;
      },
      error => {
        this.errorService.handle(error);
        this.saving = false;
      })
    }
  }

  private usernameToDelete: string;

  public deleteUser(user: any) {
    this.usernameToDelete = user.userName;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete user ${user.userName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUserConfirmed();
      }
    });
  }

  public deleteUserConfirmed() {
    this.saving = true;
    this.loginService.deleteUser(this.usernameToDelete).subscribe(result => {
      this.errorService.showSnackBar("User successfully deleted.");
      this.loadUsers();
      this.saving = false;
    }, error => {
      this.errorService.handle(error);
      this.saving = false;
    })
  }

  public loadUsers() {
    this.loginService.getUsers().subscribe(data => {
      this.dat = data;
    },
    error => {
      this.errorService.handle(error);
    })
  }

  constructor(private errorService: ErrorService,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
}

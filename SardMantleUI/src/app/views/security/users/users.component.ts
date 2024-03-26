import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role, ViewableLibraryUser } from 'src/app/models/security/library-role-permissions';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LibraryRoleService } from 'src/app/services/security/library-role.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { UserRoleService } from 'src/app/services/security/user-role.service';
import { SelectUserComponent } from '../../shared/edit/select-user/select-user.component';
import { EditSelectionListComponent } from '../../shared/edit/edit-selection-list/edit-selection-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public roles: Role[];
  public users: ViewableLibraryUser[];

  displayedColumns: string[] = ['name', 'roles', 'actions'];

  public load() {
    this.userService.get().subscribe(data => {
      this.users = data;
    },
    error => {
      this.errorService.handle(error);
    });
    this.roleService.get(undefined).subscribe(data => {
      this.roles = data;
    },
    error => {
      this.errorService.handle(error);
    });
  }

  public add() {
    const dialogRef = this.dialog.open(SelectUserComponent, {
      width: '500px',
      height: '600px',
      data: { 
        title: "Add User", 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !this.users.find(r => r.id == result.id)) {
        this.userService.put(result.id, ["Viewer"]).subscribe(result => {
          this.errorService.showSnackBar("User successfully added.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  public editUser(data: ViewableLibraryUser) {
    let roles = this.roles.map(r => r.id);
    let selectedRoles = data.libraryRoles.map(role => role.id);
    const dialogRef = this.dialog.open(EditSelectionListComponent, {
      width: '500px',
      data: { 
        title: "Select Roles", 
        items: roles,
        selectedItems: selectedRoles
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.put(data.id, result).subscribe(result => {
          this.errorService.showSnackBar("User saved.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  public deleteUser(data: ViewableLibraryUser) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete user ${data.userName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.put(data.id, []).subscribe(result => {
          this.errorService.showSnackBar("User successfully deleted.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  constructor(private errorService: ErrorService,
    private userService: UserRoleService,
    private roleService: LibraryRoleService,
    private dialog: MatDialog,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.load();
  }
}

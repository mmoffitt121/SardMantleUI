import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/models/security/library-role-permissions';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LibraryRoleService } from 'src/app/services/security/library-role.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  public permissions: string[];
  public roles: Role[];

  displayedColumns: string[] = ['name', 'permissions', 'actions'];

  public load() {
    this.rolesService.getPermissions().subscribe(permissions => this.permissions = permissions);
    this.rolesService.get(undefined).subscribe(data => {
      this.roles = data;
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public editRole(role: Role) {

  }

  public deleteRole(role: Role) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete role ${role.id}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rolesService.delete(role.id).subscribe(result => {
          this.errorService.showSnackBar("Role successfully deleted.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  constructor(private errorService: ErrorService,
    private rolesService: LibraryRoleService,
    private dialog: MatDialog,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.load();
  }
}

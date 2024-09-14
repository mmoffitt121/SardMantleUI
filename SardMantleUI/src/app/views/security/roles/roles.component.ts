import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission, Role } from 'src/app/models/security/library-role-permissions';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LibraryRoleService } from 'src/app/services/security/library-role.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { EditSelectionListComponent } from '../../shared/edit/edit-selection-list/edit-selection-list.component';
import { EditSelectionTreeComponent } from '../../shared/edit/edit-selection-tree/edit-selection-tree.component';
import { FormDialogComponent } from '../../shared/form-dialog/form-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  public permissions: Permission;
  public roles: Role[];

  displayedColumns: string[] = ['name', 'permissions', 'actions'];

  public load() {
    this.rolesService.getPermissions().subscribe(permissions => {
      this.permissions = permissions;
    });
    this.rolesService.get(undefined).subscribe(data => {
      this.roles = data;
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public add() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { 
        title: "Add Security Role", 
        items: [{
          name: "Name",
          value: "",
          required: true,
        }]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let id = result[0].value;
        let role: Role = {id, permissions: []}; 
        this.rolesService.put(role).subscribe(result => {
          this.errorService.showSnackBar("Role created successfully.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  public editRole(role: Role) {
    let rolePermissions = this.buildPermissionTree(role, this.permissions, this.permissions.id)
    const dialogRef = this.dialog.open(EditSelectionTreeComponent, {
      width: '500px',
      height: '600px',
      data: { 
        title: role.id, 
        rootItems: [rolePermissions],
        nameKey: 'description',
        selectionKeys: ['read', 'write'],
        selectionKeyHeaders: ['Read', 'Write']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        role.permissions = this.buildPermissionListFromArray(result);
        this.rolesService.put(role).subscribe(result => {
          this.errorService.showSnackBar("Role saved successfully.");
          this.load();
        }, error => this.errorService.handle(error))
      }
    });
  }

  private buildPermissionTree(role: Role, permissions: Permission, currentResource: string) {
    let permissionTree: Permission = {
      id: permissions.id,
      description: permissions.description,
      children: [],
      read: role.permissions.find(p => p === currentResource) || role.permissions.find(p => p === `${currentResource}.Read`) ? true : false,
      write: role.permissions.find(p => p === currentResource) ? true : false
    };

    permissions.children?.forEach(child => {
      permissionTree.children.push(this.buildPermissionTree(role, child, `${currentResource}.${child.id}`));
    })

    return permissionTree;
  }

  private buildPermissionListFromArray(permissions: Permission[]) {
    let arr: string[] = [];
    permissions.forEach(permission => {
      arr = arr.concat(this.buildPermissionList(permission, [], permission.id));
    }); 
    return arr;
  }

  private buildPermissionList(permission: Permission, list: string[], currentResource: string) {
    if (permission.write) {
      list.push(`${currentResource}`);
    }
    else if (permission.read) {
      list.push(`${currentResource}.Read`);
    }

    permission.children?.forEach(child => {
      this.buildPermissionList(child, list, `${currentResource}.${child.id}`)
    })
    return list;
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

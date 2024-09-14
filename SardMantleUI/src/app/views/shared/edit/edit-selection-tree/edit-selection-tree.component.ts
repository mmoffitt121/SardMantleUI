import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Permission } from 'src/app/models/security/library-role-permissions';

@Component({
  selector: 'app-edit-selection-tree',
  templateUrl: './edit-selection-tree.component.html',
  styleUrls: ['./edit-selection-tree.component.scss']
})
export class EditSelectionTreeComponent {
  @Input() title: string;
  @Input() nameKey: string;
  @Input() selectionKeys: string[];
  @Input() selectionKeyHeaders: string[];

  treeControl = new NestedTreeControl<Permission>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Permission>();

  hasChild = (_: number, node: Permission) => !!node.children && node.children.length > 0;

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(this.dataSource.data);
  }

  constructor(public dialogRef: MatDialogRef<EditSelectionTreeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.dataSource.data = this.data.rootItems;
    this.nameKey = this.data.nameKey;
    this.selectionKeys = this.data.selectionKeys;
    this.selectionKeyHeaders = this.data.selectionKeyHeaders;
  }
}

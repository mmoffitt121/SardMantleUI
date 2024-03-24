import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Permission } from 'src/app/models/security/library-role-permissions';

export interface formDialogItem {
  name: string,
  description: string,
  value: string,
  required: boolean
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  @Input() title: string;
  @Input() items: formDialogItem[];

  public valid: boolean;

  public onSave() {
    this.dialogRef.close(this.items);
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onChange() {
    let valid = true
    this.items.forEach(item => {
      if (item.required && (!item.value || item.value == "")) {
        valid = false;
        return;
      }
    });

    this.valid = valid;
  }

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.items = this.data.items;
  }
}

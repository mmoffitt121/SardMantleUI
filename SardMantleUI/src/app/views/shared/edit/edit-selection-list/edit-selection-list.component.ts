import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface SelectableItem {
  value: string,
  selected: boolean
}

@Component({
  selector: 'app-edit-selection-list',
  templateUrl: './edit-selection-list.component.html',
  styleUrls: ['./edit-selection-list.component.scss']
})
export class EditSelectionListComponent {
  @Input() title: string;
  public items: SelectableItem[];

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(this.items.filter(item => item.selected).map(item => item.value));
  }

  constructor(public dialogRef: MatDialogRef<EditSelectionListComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.items = this.data.items;
    console.log(this.data);
    this.items = this.data.items.map((item: string) => {
      return {
        value: item,
        selected: this.data.selectedItems.find((i: string) => i == item) ? true : false
      }
    });
    
  }
}

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface SelectableItem {
  label: string,
  value: any,
  selected?: boolean
}

@Component({
  selector: 'app-edit-labelled-selection-list',
  templateUrl: './edit-labelled-selection-list.component.html',
  styleUrls: ['./edit-labelled-selection-list.component.scss']
})
export class EditLabelledSelectionListComponent {
  @Input() title: string;
  public items: SelectableItem[];
  @Input() single: boolean = false;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(this.items.filter(item => item.selected).map(item => item.value));
  }

  constructor(public dialogRef: MatDialogRef<EditLabelledSelectionListComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.items = this.data.items;
    this.single = !!this.data.single;
    this.items = this.data.items.map((item: SelectableItem) => {
      return {
        label: item.label,
        value: item.value,
        selected: this.data.selectedItems.find((i: string) => i == item.value) ? true : false
      }
    });    
  }
}

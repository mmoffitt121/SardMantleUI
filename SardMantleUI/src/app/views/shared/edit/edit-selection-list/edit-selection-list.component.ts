import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-selection-list',
  templateUrl: './edit-selection-list.component.html',
  styleUrls: ['./edit-selection-list.component.scss']
})
export class EditSelectionListComponent {
  @Input() title: string;
  @Input() items: any[];
  @Input() selectedItems: any[];

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();



  constructor(public dialogRef: MatDialogRef<EditSelectionListComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.items = this.data.items;
    this.selectedItems = this.data.selectedItems;
    console.log(this.items)
  }
}

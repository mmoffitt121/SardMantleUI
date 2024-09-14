import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-document-popup',
  templateUrl: './document-popup.component.html',
  styleUrls: ['./document-popup.component.scss']
})
export class DocumentPopupComponent {
  public id: number;

  public handleClose() {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<DocumentPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }
}

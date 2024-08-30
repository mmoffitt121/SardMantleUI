import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public content: string;
  public showCancel = true;
  public lines = [];

  confirmText = "Confirm";
  cancelText = "Cancel";

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
    if (this.data.showCancel === false) {
      this.showCancel = false;
    }
    if (this.data.lines) {
      this.lines = this.data.lines;
    }
    this.confirmText = this.data.confirmText ?? this.confirmText;
    this.cancelText = this.data.cancelText ?? this.cancelText;
  }

  public cancelChoice() {
    this.dialogRef.close(false);
  }

  public confirmChoice() {
    this.dialogRef.close(true);
  }
}

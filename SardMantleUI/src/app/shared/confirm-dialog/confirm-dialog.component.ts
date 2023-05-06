import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public content: string;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  public cancelChoice() {
    this.dialogRef.close(false);
  }

  public confirmChoice() {
    this.dialogRef.close(true);
  }
}

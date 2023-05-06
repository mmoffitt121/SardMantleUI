import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public cancelChoice() {
    this.cancel.emit();
  }

  public confirmChoice() {
    this.confirm.emit();
  }
}


  /*public header: string;
  public content: string;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public cancelChoice() {
    this.confirm.emit();
  }

  public confirmChoice() {
    this.cancel.emit();
  }*/
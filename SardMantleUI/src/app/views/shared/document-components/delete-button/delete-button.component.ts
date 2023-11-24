import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input() text = "Delete";
  @Input() messageTitle = "Confirm Deletion";
  @Input() messageContent = "Are you sure you want to delete this?";

  @Output() delete = new EventEmitter();

  public onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: this.messageTitle, 
        content: this.messageContent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit();
      }
    });
  }

  constructor(private dialog: MatDialog) {}
}

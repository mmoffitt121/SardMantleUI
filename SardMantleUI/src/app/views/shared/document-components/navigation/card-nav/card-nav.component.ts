import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { CardNavItem } from 'src/app/models/navigation/card-nav-item';

@Component({
  selector: 'app-card-nav',
  templateUrl: './card-nav.component.html',
  styleUrls: ['./card-nav.component.scss']
})
export class CardNavComponent {
  @Output() up = new EventEmitter();
  @Output() down = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() action = new EventEmitter();

  @Input() deleteMessageTitle = "Confirm Deletion";
  @Input() deleteMessageContent = "Are you sure you want to delete this?";

  @Input() items = [] as CardNavItem[];

  public onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: this.deleteMessageTitle, 
        content: this.deleteMessageContent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit();
      }
    });
  }

  public getItemClass(item: CardNavItem) {
    let index = this.items.indexOf(item);
    let length = this.items.length;
    if (index == 0) {
      return length > 1 ? 'card-side-button-top' : 'card-side-button-only';
    }
    else {
      return length > index + 1 ? 'card-side-button-only' : 'card-side-button-bottom';
    }
  }

  constructor(private dialog: MatDialog) {}
}

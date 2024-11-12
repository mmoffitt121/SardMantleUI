import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageElement } from 'src/app/models/pages/page';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-page-element-setting-list-item',
  templateUrl: './page-element-setting-list-item.component.html',
  styleUrls: ['./page-element-setting-list-item.component.scss']
})
export class PageElementSettingListItemComponent implements OnInit {
  @Input() element: PageElement;
  public settings: any;

  @Output() delete = new EventEmitter();

  public editClicked() {
    this.service.select(this.element);
  }

  public deleteClicked() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to remove this page element?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.element);
      }
    });
  }

  constructor (private dialog: MatDialog, private service: PageEditorService) {}

  ngOnInit(): void {
    this.settings = JSON.parse(this.element?.objectSettings ?? "{}");
  }
}

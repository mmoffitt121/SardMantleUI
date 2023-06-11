import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { ErrorService } from 'src/app/services/error.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { EditStringComponent } from 'src/app/views/shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from 'src/app/views/shared/document-components/edit/edit-summary/edit-summary.component';

@Component({
  selector: 'app-edit-type-parameter',
  templateUrl: './edit-type-parameter.component.html',
  styleUrls: ['./edit-type-parameter.component.css']
})
export class EditTypeParameterComponent {
  @ViewChild('titleComponent') titleComponent: EditStringComponent;
  @ViewChild('summaryComponent') summaryComponent: EditSummaryComponent;

  @Output() delete = new EventEmitter();

  public parameter: DocumentTypeParameter;

  public onTitleChanged(event: any) {
    this.parameter.name = event;
  }
  
  public onSummaryChanged(event: any) {
    this.parameter.summary = event;
  }

  public setValues(p: DocumentTypeParameter) {
    this.parameter = p;
    this.titleComponent.setValue(p.name);
    this.summaryComponent.setValue(p.summary);
  }

  public confirmDeleteObject() {
    var deleteMessage = (this.parameter.name) ? 
    ("Are you sure you want to delete parameter " + (this.parameter.name) + "?") : 
    ("Are you sure you want to delete this parameter?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: deleteMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.parameter);
      }
    });
  }

  constructor (public dialog: MatDialog, private errorHandler: ErrorService) { }
}
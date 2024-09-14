import { Component, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss']
})
export class AddDocumentTypeComponent {
  private title: string;
  private summary: string;

  public onTitleChanged(data: any) {
    this.title = data;
  }

  public onSummaryChanged(data: any) {
    this.summary = data;
  }

  public close() {
    this.dialogRef.close();
  }

  public add() {
   this.service.postDocumentType({ name: this.title, summary: this.summary } as DocumentType).subscribe(result => {
    this.dialogRef.close(result);
   },
   error => {
    this.errorService.handle(error);
   });
  }

  constructor(public dialogRef: MatDialogRef<AddDocumentTypeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private service: DocumentTypeService,
    private errorService: ErrorService) { }
}

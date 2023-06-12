import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { EditStringComponent } from 'src/app/views/shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from 'src/app/views/shared/document-components/edit/edit-summary/edit-summary.component';

@Component({
  selector: 'app-edit-document-type-properties',
  templateUrl: './edit-document-type-properties.component.html',
  styleUrls: ['./edit-document-type-properties.component.css']
})
export class EditDocumentTypePropertiesComponent {
  @ViewChild('titleComponent') titleComponent: EditStringComponent;
  @ViewChild('summaryComponent') summaryComponent: EditSummaryComponent;

  @Output() delete = new EventEmitter();

  public documentType: DocumentType;

  public onTitleChanged(event: any) {
    this.documentType.name = event;
  }
  
  public onSummaryChanged(event: any) {
    this.documentType.summary = event;
  }

  public onDelete() {
    this.delete.emit();
  }

  public setValues(dt: DocumentType) {
    this.documentType = dt;
    this.titleComponent.setValue(dt.name);
    this.summaryComponent.setValue(dt.summary);
  }
}

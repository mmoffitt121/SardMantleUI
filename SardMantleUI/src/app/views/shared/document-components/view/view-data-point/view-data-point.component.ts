import { Component } from '@angular/core';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';

@Component({
  selector: 'app-view-data-point',
  templateUrl: './view-data-point.component.html',
  styleUrls: ['./view-data-point.component.scss']
})
export class ViewDataPointComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public document: Document | undefined;
  public documentType: DocumentType | undefined;

  public setValue(value: number) {
    if (value === undefined) return;
    this.documentService.getDocument(value).subscribe(data => {
      this.document = data;
      this.typeService.getDocumentType(this.document?.typeId ?? -1).subscribe(data => this.documentType = data)
    })
  }

  constructor (private documentService: DocumentService, private typeService: DocumentTypeService) { }
}

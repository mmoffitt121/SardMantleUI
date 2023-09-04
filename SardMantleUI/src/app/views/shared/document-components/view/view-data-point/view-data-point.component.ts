import { Component, Input } from '@angular/core';
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
  @Input() document: Document | undefined;
  @Input() viewDivider = true;

  public setValue(value: number) {
    if (value === undefined) return;
    this.documentService.getDocument(value).subscribe(data => {
      this.document = data;
    })
  }

  public setDocument(value: Document) {
    this.document = value;
  }

  constructor (private documentService: DocumentService, private typeService: DocumentTypeService) { }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PresentationParamBaseComponent } from '../presentation-param-base/presentation-param-base.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { Document } from 'src/app/models/document/document-types/document';

@Component({
  selector: 'app-presentation-param-data-point',
  templateUrl: './presentation-param-data-point.component.html',
  styleUrls: ['./presentation-param-data-point.component.scss']
})
export class PresentationParamDataPointComponent extends PresentationParamBaseComponent implements OnChanges {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() document: Document | undefined;
  @Input() viewDivider = true;
  @Input() dialogRef: MatDialogRef<any> | undefined = undefined;

  public setDocumentId(id: number) {
    this.documentService.getDocument(id).subscribe(data => {
      this.document = data;
    })
  }

  constructor (private documentService: DocumentService, private typeService: DocumentTypeService, public dialog: MatDialog) { 
    super(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameter'] && this.parameter.value) {
      this.setDocumentId(this.parameter.value);
    }
  }
}

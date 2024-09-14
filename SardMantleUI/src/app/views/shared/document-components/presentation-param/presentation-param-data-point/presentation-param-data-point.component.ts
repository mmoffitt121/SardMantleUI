import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class PresentationParamDataPointComponent extends PresentationParamBaseComponent {
  @Input() document: Document | undefined;
  @Input() viewDivider = true;

  constructor (private documentService: DocumentService, private typeService: DocumentTypeService, public dialog: MatDialog) { 
    super(); 
  }
}

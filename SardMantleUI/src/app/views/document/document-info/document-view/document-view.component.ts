import { Component, ViewChild } from '@angular/core';
import { DocumentInfoComponent } from '../document-info.component';
import { Document } from 'src/app/models/document/document-types/document';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent {
  @ViewChild('documentInfoComponent') documentInfoComponent: DocumentInfoComponent;
  public selectDocument(doc: Document) {
    this.documentInfoComponent.setDocument(doc.id);
  }
  public pushDocument(doc: Document) {
    
  }
}

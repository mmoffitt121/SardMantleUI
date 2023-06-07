import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements AfterViewInit {
  @ViewChild('documentTypeComponent') documentTypeComponent: DocumentTypeComponent;
  @ViewChild('documentListComponent') documentListComponent: DocumentListComponent;
  @ViewChild('documentLInfoComponent') documentInfoComponent: DocumentInfoComponent;

  public loadDocumentList(data: any) {
    this.documentListComponent.setDocumentType(data.id);
  }

  public loadDocument(data: any) {
    this.documentInfoComponent.setDocument(data.id);
  }

  constructor(public router: Router) { }

  ngAfterViewInit(): void {
    this.loadDocumentList({id: -1});
  }
}

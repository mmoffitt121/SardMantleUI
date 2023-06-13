import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: Document[]

  @Output() select = new EventEmitter();

  public setDocumentType(id: number) {
    if (id == -1) {
      this.documentService.getDocuments({ }).subscribe(data => {
        this.documents = data;
      })
    }
    else {
      this.documentService.getDocuments({ typeId: id }).subscribe(data => {
        this.documents = data;
      })
    }
  }

  public selectDocument(e: any) {
    this.select.emit({id: e.currentTarget.value});

    this.documents.forEach(d => {
      if (d.id == e.currentTarget.value) {
        d.selected = true;
      }
      else {
        d.selected = false;
      }
    })
  }

  constructor(private documentTypeService: DocumentTypeService, private documentService: DocumentService) { }

  ngOnInit(): void {
    
  }
}

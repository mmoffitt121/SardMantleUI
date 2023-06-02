import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document/document-types/document';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[]
  public setDocumentType(id: number) {
    
  }

  constructor() { }

  ngOnInit(): void {
    
  }
}

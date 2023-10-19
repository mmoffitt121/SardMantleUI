import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: Document[]

  @Output() select = new EventEmitter();
  @Output() doubleSelect = new EventEmitter();

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 50;
  public pageSizeOptions: any;

  public searchQuery: any = {};

  public onPageChange(data: any) {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.search(this.searchQuery, false);
  }

  public setDocumentType(id: number, pageCriteria: any) {
    if (id == -1) {
      this.documentService.getDocuments(pageCriteria).subscribe(data => {
        this.documents = data;
      })
    }
    else {
      this.documentService.getDocuments({ typeId: id, ...pageCriteria }).subscribe(data => {
        this.documents = data;
      })
    }
  }

  public search(searchQuery: any, resetPages: boolean) {
    this.searchQuery = searchQuery;
    if (resetPages) {
      this.pageIndex = 0;
      this.pageSize = 50;
    }
    let query = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      ...searchQuery
    }
    console.log(query)
    this.documentService.getDocuments(query).pipe(take(1)).subscribe(data => {
      this.documents = data;
    });
    this.documentService.getDocumentsCount(query).pipe(take(1)).subscribe (data => {
      this.pageLength = data;
    })
  }

  private clickTime = 0;

  public selectDocument(doc: any) {
    this.select.emit(doc);
    this.documents.forEach(d => {
      if (d.id == doc.id) {
        d.selected = true;
      }
      else {
        d.selected = false;
      }
    })

    if (this.clickTime == 0) {
      this.clickTime = new Date().getTime();
    }
    else {
      if (new Date().getTime() - this.clickTime < 600) {
        this.doubleSelectDocument(doc);
        return;
      }
      else {
        this.clickTime = 0;
      }
    }
  }

  public doubleSelectDocument(doc: any) {
    this.doubleSelect.emit(doc);
  }

  constructor(private documentTypeService: DocumentTypeService, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.search({}, true);
  }
}

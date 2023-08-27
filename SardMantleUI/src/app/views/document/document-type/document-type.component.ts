import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  allSelected: boolean = true;
  documentTypes: DocumentType[];

  @Output() select = new EventEmitter();

  public page() {
    
  }

  public selectDocumentType(e: any) {
    this.select.emit({id: e.currentTarget.value});
    this.allSelected = e.currentTarget.value == -1;

    this.documentTypes?.forEach(dt => {
      if (dt.id == e.currentTarget.value) {
        dt.selected = true;
      }
      else {
        dt.selected = false;
      }
    })
  }

  public loadDocumentTypes(criteria: any) {
    this.documentTypeService.getDocumentTypes(criteria).subscribe(data => {
      this.documentTypes = data
    })
  }

  constructor(public documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {}
}

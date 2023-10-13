import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { SearchBarComponent } from '../../shared/document-components/search/search-bar/search-bar.component';

@Component({
  selector: 'app-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.scss']
})
export class DocumentFilterComponent implements OnInit {
  public documentTypeControl = new FormControl();
  public documentControl = new FormControl();

  @Output() searchTypes = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('typesSearchBar') typesSearchBar: SearchBarComponent;

  public documentTypeFilter: string;
  public documentFilter: string;

  public documentTypes: DocumentType[] = [];
  public selectedTypes: DocumentType[] = [];

  public searchableParams: any[] = [];

  public toggleTypeSelected(type: DocumentType) {
    if (type.selected) {
      const i = this.selectedTypes.indexOf(type);
      if (i > -1) {
        this.selectedTypes.splice(i, 1);
        type.selected = false;
      }
    }
    else {
      this.selectedTypes.push(type);
      type.selected = true;
    }

    this.loadParameters();
  }

  public filterDocumentTypes() {
    let criteria = {
      pageSize: 12,
      pageNumber: 1,
      query: this.typesSearchBar?.getValue() ?? ''
    };

    this.documentTypeService.getDocumentTypes(criteria).subscribe(data => {
      this.documentTypes = data;
      this.documentTypes.forEach(type => {
        if (this.selectedTypes.find(t => t.id == type.id)) {
          type.selected = true;
        }
      });
    }, error => this.errorService.handle(error));
  }

  public loadParameters() {
    let ids: number[] = [];
    this.selectedTypes.forEach(type => ids.push(type.id));

    let criteria = { dataPointTypeIds: ids?.length > 0 ? ids : -1 }
    this.documentTypeService.getDocumentTypesFull(criteria).subscribe(data => {
      this.searchableParams = [];
      data.forEach((type: DocumentType) => {
        type.typeParameters?.forEach((p: any) => {
          this.searchableParams.push(p);
        });
      })
      this.searchableParams.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  constructor(
    public documentTypeService: DocumentTypeService, 
    public dialog: MatDialog, 
    private router: Router, 
    private urlService: UrlService, 
    private errorService: ErrorService
  ) { }

  public ngOnInit() {

  }
}

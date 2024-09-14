import { Component, EventEmitter, Output, OnInit, ViewChild, ChangeDetectorRef, Inject, Optional, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { SearchBarComponent } from '../../shared/document-components/search/search-bar/search-bar.component';
import { EditParametersComponent } from '../../shared/document-components/edit/edit-parameters/edit-parameters.component';

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
  @ViewChild('editParams') editParams: EditParametersComponent;

  public documentTypeFilter: string;
  public documentFilter: string;

  public documentTypes: DocumentType[] = [];
  public selectedTypes: DocumentType[] = [];

  public searchableParams: any[] = [];

  public pageMode = "documentTypes";
  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 50;
  public pageSizeOptions: any;

  public typeMultiSelect = false;

  public showSwitcher = true;
  public confirmMessage = "Search";

  public toggleMultiSelect() {
    this.typeMultiSelect = !this.typeMultiSelect;
    if (!this.typeMultiSelect) {
      this.selectedTypes = [];
      this.filterDocumentTypes();
    }
    this.loadParameters();
  }

  public toggleTypeSelected(type: DocumentType) {
    if (!this.typeMultiSelect) {
      this.selectedTypes = [];
      this.documentTypes.forEach(type => type.selected = false);
    }

    if (type.selected) {
      const i = this.selectedTypes.findIndex(x => x.id == type.id);
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
    this.onSearch();
  }

  public filterDocumentTypes() {
    let criteria = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      query: this.typesSearchBar?.getValue() ?? '',
    };

    this.documentTypeService.getDocumentTypes(criteria).subscribe(data => {
      this.documentTypes = data;
      this.documentTypes.forEach(type => {
        if (this.selectedTypes.find(t => t.id == type.id)) {
          type.selected = true;
        }
      });
    }, error => this.errorService.handle(error));

    this.documentTypeService.getDocumentTypesCount(criteria).subscribe(data => {
      this.pageLength = data;
    }, error => this.errorService.handle(error));
  }

  public loadParameters() {
    let ids: number[] = [];
    this.selectedTypes.forEach(type => ids.push(type.id));

    let criteria = { dataPointTypeIds: ids?.length > 0 ? ids : -1 }
    this.documentTypeService.getDocumentTypesFull(criteria).subscribe(data => {
      this.searchableParams = [];
      data?.forEach((type: DocumentType) => {
        type.typeParameters?.forEach((p: any) => {
          if (p.typeValue !== 'doc') {
            this.searchableParams.push(p);
          }
        });
      })
      this.cdref.detectChanges();
      this.searchableParams.sort((a, b) => a.name.localeCompare(b.name));
      this.editParams?.setTypeParameters(this.searchableParams);
      if (this.data?.criteria.parameters && this.editParams) {
        this.editParams.setParameters(this.data.criteria.parameters);
      }
      if (this.data?.criteria.parameterSearchOptions && this.editParams) {
        this.editParams.setParameterSearchOptions(this.data.criteria.parameterSearchOptions);
      }
    })
  }

  public onSearch() {
    let typeIds: any[] = [];
    this.selectedTypes.forEach(type => {
      typeIds.push(type.id);
    })
    this.search.emit({
      query: this.documentControl.value ?? '',
      parameters: this.editParams?.getParameterList(),
      parameterSearchOptions: this.editParams?.getParameterSearchOptions(),
      typeIds: typeIds
    });
  }

  public onConfirm() {
    let typeIds: any[] = [];
    this.selectedTypes.forEach(type => {
      typeIds.push(type.id);
    })
    if (this.dialogRef) {
      this.dialogRef.close({
        query: this.documentControl.value ?? '',
        parameters: this.editParams?.getParameterList(),
        parameterSearchOptions: this.editParams?.getParameterSearchOptions(),
        typeIds: typeIds
      });
    }
  }

  public onPageChange(data: any) {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.filterDocumentTypes();
  }

  public setPageMode(mode: string) {
    this.pageMode = mode;
  }

  constructor(
    public documentTypeService: DocumentTypeService, 
    public dialog: MatDialog, 
    private router: Router, 
    private urlService: UrlService, 
    private errorService: ErrorService,
    private cdref: ChangeDetectorRef,
    @Optional() public dialogRef: MatDialogRef<DocumentFilterComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if (data) {
      this.showSwitcher = data.showSwitcher ?? this.showSwitcher;
      this.confirmMessage = data.confirmMessage ?? this.confirmMessage;
      if (data.pageMode) {
        this.setPageMode(data.pageMode);
      }
      if (data.criteria) {
        if (data.criteria.query) this.documentControl.setValue(data.criteria.query);

        if (data.criteria.typeIds){
          this.selectedTypes = data.criteria.typeIds.map((typeId: number) => {return {id: typeId}});
          if (this.selectedTypes.length > 1) {
            this.typeMultiSelect = true;
          }
          this.loadParameters();
        } 
      }
    }
  }

  public ngOnInit() {
    this.filterDocumentTypes();
  }
}

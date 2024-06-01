import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPointQueryResult } from 'src/app/models/document/document-query-result';
import { DataPointTypeParameter, View } from 'src/app/models/pages/view';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { DocumentPopupComponent } from 'src/app/views/shared/document-components/document-popup/document-popup.component';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent implements OnInit, OnChanges {
  @Input() view: View;
  public data: DataPointQueryResult;

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 25;

  public onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.view.searchCriteriaOptions!.criteria.pageNumber = this.pageIndex + 1;
    this.view.searchCriteriaOptions!.criteria.pageSize = this.pageSize;

    this.loadView();
  }

  public toggleSortDirection() {
    this.view.searchCriteriaOptions!.criteria.orderByTypeParamDesc = !this.view.searchCriteriaOptions?.criteria.orderByTypeParamDesc;
    this.loadView();
  }

  public setSort(sort: DataPointTypeParameter) {
    if (sort.id == -1) {
      this.view.searchCriteriaOptions!.criteria.orderByTypeParam = undefined;
    } else {
      this.view.searchCriteriaOptions!.criteria.orderByTypeParam = sort;
    }
    
    this.loadView();
  }

  public loadView() {
    if (this.view) {
      this.queryService.query(this.view.searchCriteriaOptions!.criteria).subscribe(result => {
        this.data = result;
        this.pageLength = result.count;
      }, error => this.errorService.handle(error))
    }
  }

  public initView() {
    this.pageIndex = 0;
    this.pageSize = 25;
    this.view.searchCriteriaOptions!.criteria.pageNumber = this.pageIndex + 1;
    this.view.searchCriteriaOptions!.criteria.pageSize = this.pageSize;
    this.loadView();
  }

  public popupDocument(doc: any) {
    const ref = this.dialog.open(DocumentPopupComponent,  {
      width: 'min(100vw, 750px)',
      height: 'min(100vh, 900px)',
      data: { 
        id: doc.id
      }
    })
  }

  public maybeAdd() {
    if (this.data?.types?.length == 1) {
      this.add(this.data.types[0]);
    }
  }

  public add(type: any) {
    this.router.navigate([this.urlService.getWorld(), 'document', 'add', type.id])
  }

  constructor(public queryService: ViewQueryService, public errorService: ErrorService, private documentService: DocumentService, private typeService: DocumentTypeService, public dialog: MatDialog, private router: Router, private urlService: UrlService) {}

  public ngOnInit(): void {
    this.initView();
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["view"]) {
      this.initView();
    }
  }
}

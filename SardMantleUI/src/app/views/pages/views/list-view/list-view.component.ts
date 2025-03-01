import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericViewComponent } from '../generic-view/generic-view.component';
import { MatDrawer } from '@angular/material/sidenav';
import { ViewCommunicationService } from 'src/app/services/pages/view-communication.service';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { ErrorService } from 'src/app/services/error.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent extends GenericViewComponent {
  public id: number | undefined;

  constructor(
    queryService: ViewQueryService, 
    errorService: ErrorService, 
    documentService: DocumentService, 
    typeService: DocumentTypeService, 
    dialog: MatDialog, 
    router: Router, 
    urlService: UrlService,
    viewQueryService: ViewQueryService,
    skeletonService: SkeletonService,
    private service: ViewCommunicationService
  ) { 
    super(queryService, errorService, documentService, typeService, dialog, router, urlService, viewQueryService, skeletonService); 
  }

  public select(item?: QueriedDataPoint) {
    this.id = item?.id ?? -1;
    this.service.select(item);
  }
}

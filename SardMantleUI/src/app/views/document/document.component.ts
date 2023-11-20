import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Location as RouteLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentTypeComponent } from './document-type/add-document-type/add-document-type.component';
import { Location } from '@angular/common';
import { UrlService } from 'src/app/services/url/url.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DocumentService } from 'src/app/services/document/document.service';
import { ErrorService } from 'src/app/services/error.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { MatSidenavModule, MatDrawer, MatDrawerContainer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { DocumentFilterComponent } from './document-filter/document-filter.component';
import { Observable, fromEvent, throttleTime } from 'rxjs';
import { DocumentViewComponent } from './document-info/document-view/document-view.component';
import { Document } from 'src/app/models/document/document-types/document';
import { LoginService } from 'src/app/services/login/login.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @ViewChild('documentTypeComponent') documentTypeComponent: DocumentTypeComponent;
  @ViewChild('documentListComponent') documentListComponent: DocumentListComponent;
  @ViewChild('documentViewComponent') documentViewComponent: DocumentViewComponent;
  @ViewChild('documentEditComponent') documentEditComponent: DocumentEditComponent;
  @ViewChild('documentFilterComponent') doucmentFilterComponent: DocumentFilterComponent;

  public searching = false;

  public typePageLength = 0;
  public typePageIndex = 0;
  public typePageSize = 35;
  public typePageSizeOptions: any;

  private getTypePageCriteria() {
    return {
      pageSize: this.typePageSize,
      pageNumber: this.typePageIndex + 1,
      query: this.doucmentFilterComponent?.documentTypeFilter ?? ""
    }
  }

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 35;
  public pageSizeOptions: any;

  private getPageCriteria() {
    return {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      query: this.doucmentFilterComponent?.documentFilter ?? ""
    }
  }

  public displayMode = "search";

  public editing = false;
  public adding = false;

  public currentDocumentTypeId: number | undefined;
  public currentDocumentId: number | undefined;

  public wideScreen = this.isWideScreen();

  public searchCriteria: any;

  public isWideScreen() {
    return document.body.offsetWidth > 1000;
  }

  public canSeeFullSearch() {
    return this.wideScreen && (this.displayMode === 'search' || this.displayMode === 'results' || this.displayMode === 'view')
  }

  public setDisplayMode(val: string) {
    var route = this.urlService.getWorld() + '/document/' + val;
    this.routeLocation.replaceState(route);
    this.displayMode = val;
  }

  public onSearch(event: any) {
    this.searchCriteria = event;
    this.displayMode = 'results';
    this.documentListComponent.search(event, true);
  }

  public handleAddDocument(event: any) {
    this.editing = true;
    const typeId = this.currentDocumentTypeId;
    this.cdref.detectChanges();
    if (!typeId) return;
    this.documentEditComponent.setDocumentType(typeId);
  }

  public addEditComplete(event: any) {
    this.loadDocument({id: event.documentId});
  }

  public loadDocument(data: any) {
    this.displayMode = 'view';
    this.editing = false;
    this.cdref.detectChanges();
    this.currentDocumentId = data.id;
    this.documentViewComponent.selectDocument(data);
    this.location.replaceState(this.urlService.getWorld() + "/document/view/" + data.id);
  }

  public clearDocument() {
    this.documentViewComponent.clear();
  }

  public pushDocument(data: any) {
    this.loadDocument(data);
    this.documentViewComponent.pushDocument(data);
  }

  public addDocumentType() {
    const dialogRef = this.dialog.open(AddDocumentTypeComponent, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.router.navigate([this.urlService.getWorld(), 'document', 'type', 'edit', result]);
      }
    });
  }

  public handleNavigate() {
    this.route.params.subscribe(params => {
      let mode = this.router.url.split('/')[3];
      switch(mode) {
        case 'edit':
          if (params['docId']) {
            this.displayMode = mode;
            this.cdref.detectChanges();
            this.documentEditComponent.setDocument(params['docId']);
            this.documentEditComponent.editing = true;
          }
          else {
            this.displayMode = 'search';
          }
          break;
        case 'view':
          if (params['docId']) {
            this.displayMode = mode;
            this.cdref.detectChanges();
            this.documentViewComponent.selectDocument({id: params['docId']} as Document);
          }
          else {
            this.displayMode = 'search';
          }
          break;
        case 'search':
        case 'results':
        case 'add':
        case 'type':
          this.displayMode = mode;
          break;
        default: 
          break;
      }
    });
  }

  constructor (
    public router: Router, 
    private cdref: ChangeDetectorRef, 
    public dialog: MatDialog, 
    private location: Location,
    private route: ActivatedRoute,
    public urlService: UrlService,
    private themeService: ThemeService,
    private documentService: DocumentService,
    private documentTypeService: DocumentTypeService,
    private errorService: ErrorService,
    private routeLocation: RouteLocation,
    public loginService: LoginService,
    public skeletonService: SkeletonService
  ) { 
  }

  ngOnInit(): void {
    fromEvent(window, 'resize').pipe(throttleTime(50)).subscribe(event => this.wideScreen = this.isWideScreen())
    this.handleNavigate();
  }
}

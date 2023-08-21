import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements AfterViewInit {
  @ViewChild('documentTypeComponent') documentTypeComponent: DocumentTypeComponent;
  @ViewChild('documentListComponent') documentListComponent: DocumentListComponent;
  @ViewChild('documentInfoComponent') documentInfoComponent: DocumentInfoComponent;
  @ViewChild('documentEditComponent') documentEditComponent: DocumentEditComponent;

  public typePageLength = 0;
  public typePageIndex = 0;
  public typePageSize = 5;
  public typePageSizeOptions: any;

  public editing = false;
  public adding = false;

  public currentDocumentTypeId: number | undefined;
  private currentDocumentId: number | undefined;

  public onTypePageChange(event: any) {
    this.documentTypeComponent.page();
  }

  public handleAddDocument(event: any) {
    this.editing = true;
    const typeId = this.currentDocumentTypeId;
    this.cdref.detectChanges();
    if (!typeId) return;
    this.documentEditComponent.setDocumentType(typeId);
  }

  public handleEditDocument(event: any) {
    this.editing = true;
    const id = this.documentInfoComponent.document? this.documentInfoComponent.document.id : -1;
    this.cdref.detectChanges();
    this.documentEditComponent.setDocument(id ?? -1);
  }

  public cancelAddEdit(event: any) {
    this.editing = false;
    this.loadDocument({ id: this.currentDocumentId });
    if (this.currentDocumentTypeId != undefined) {
      this.documentInfoComponent.setDocumentType(this.currentDocumentTypeId);
    }
  }

  public addEditComplete(event: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([this.urlService.getWorld(), 'document', event.documentTypeId, event.documentId]);
  }

  public handleDeleteDocument(document: any) {
    var deleteMessage = `Are you sure you want to delete ${document.name}?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: deleteMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDocument();
      }
    });
  }

  public deleteDocument() {
    this.documentService.deleteDocument(this.currentDocumentId ?? -1).subscribe(result => {
      this.errorService.showSnackBar(`Delete successful.`);
      this.documentTypeComponent.selectDocumentType({currentTarget: {value: this.currentDocumentTypeId}});
      this.loadDocumentList({id: this.currentDocumentTypeId});
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public loadDocumentList(data: any) {
    this.editing = false;
    this.cdref.detectChanges();
    this.currentDocumentTypeId = data.id;
    this.documentListComponent.setDocumentType(data.id);
    this.location.replaceState(this.urlService.getWorld() + "/document/" + data.id);
    this.documentInfoComponent.setDocumentType(data.id);
  }

  public loadDocument(data: any) {
    this.editing = false;
    this.cdref.detectChanges();
    this.currentDocumentId = data.id;
    this.documentInfoComponent.setDocument(data.id);
    this.location.replaceState(this.urlService.getWorld() + "/document/" + this.currentDocumentTypeId + "/" + data.id);
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

  public editDocumentType() {
    this.router.navigate([this.urlService.getWorld(), 'document', 'type', 'edit', this.currentDocumentTypeId]);
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
    private errorService: ErrorService
  ) { 
    this.route.params.subscribe(params => {
      this.currentDocumentTypeId = params['typeId'];
      this.currentDocumentId = params['documentId'];
    });
  }

  ngAfterViewInit(): void {
    if (this.currentDocumentId != undefined) {
      this.documentInfoComponent.setDocument(this.currentDocumentId);
      this.documentTypeComponent.selectDocumentType({currentTarget: {value: this.currentDocumentTypeId}});
      this.loadDocumentList({id: this.currentDocumentTypeId});
      this.location.replaceState(this.urlService.getWorld() + "/document/" + this.currentDocumentTypeId + "/" + this.currentDocumentId);
    }
    else if (this.currentDocumentTypeId != undefined) {
      this.documentTypeComponent.selectDocumentType({currentTarget: {value: this.currentDocumentTypeId}});
      this.loadDocumentList({id: this.currentDocumentTypeId});
    }
  }
}

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

  public editing = false;
  public adding = false;

  public currentDocumentTypeId: number | undefined;
  private currentDocumentId: number | undefined;

  public handleAddDocument(event: any) {
    this.editing = true;
    const typeId = this.documentInfoComponent.documentType?.id;
    this.cdref.detectChanges();
    if (!typeId) return;
    this.documentEditComponent.setDocumentType(typeId);
  }

  public handleEditDocument(event: any) {
    this.editing = true;
    const id = this.documentInfoComponent.document? this.documentInfoComponent.document.id : -1;
    this.cdref.detectChanges();
    this.documentEditComponent.setDocument(id);
  }

  public cancelAddEdit(event: any) {
    this.editing = false;
    this.loadDocument({ id: this.currentDocumentId });
    if (this.currentDocumentTypeId != undefined) {
      this.documentInfoComponent.setDocumentType(this.currentDocumentTypeId);
    }
  }

  public handleDeleteDocument(event: any) {
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
    private themeService: ThemeService
  ) { 
    this.route.params.subscribe(params => {
      this.currentDocumentTypeId = params['typeId'];
      this.currentDocumentId = params['documentId'];
    });
  }

  ngAfterViewInit(): void {
    if (this.currentDocumentTypeId != undefined) {
      this.documentTypeComponent.selectDocumentType({currentTarget: {value: this.currentDocumentTypeId}});
      this.loadDocumentList({id: this.currentDocumentTypeId});
      if (this.currentDocumentId != undefined) {
        this.documentInfoComponent.setDocument(this.currentDocumentId);
      }
    }
  }
}

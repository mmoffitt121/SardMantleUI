import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { UrlService } from 'src/app/services/url/url.service';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';
import { forkJoin } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { SearchBarComponent } from '../../shared/document-components/search/search-bar/search-bar.component';
import { LoginService } from 'src/app/services/login/login.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  allSelected: boolean = true;
  documentTypes: DocumentType[];

  @ViewChild('searchBar') searchBar: SearchBarComponent;

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 50;
  public pageSizeOptions: [4, 7, 9];

  @Output() select = new EventEmitter();

  public onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadDocumentTypes(this.getPageCriteria());
  }

  public getPageCriteria() {
    return {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      query: this.searchBar?.getValue() ?? ''
    }
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
    this.documentTypeService.getDocumentTypes(criteria).subscribe(data => this.documentTypes = data, error => this.errorService.handle(error));
    this.documentTypeService.getDocumentTypesCount(criteria).subscribe(data => this.pageLength = data, error => this.errorService.handle(error));
  }

  public addDocumentType() {
    const dialogRef = this.dialog.open(AddDocumentTypeComponent, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.router.navigate([this.urlService.getWorld(), 'document-type', 'edit', result]);
      }
    });
  }

  public editDocumentType(id: number) {
    this.router.navigate([this.urlService.getWorld(), 'document-type', 'edit', id]);
  }

  constructor(
    public documentTypeService: DocumentTypeService, 
    public dialog: MatDialog, 
    private router: Router, 
    private urlService: UrlService, 
    private errorService: ErrorService,
    public loginService: LoginService,
    public skeletonService: SkeletonService
  ) { }

  ngOnInit(): void {
    this.loadDocumentTypes(this.getPageCriteria());
  }
}

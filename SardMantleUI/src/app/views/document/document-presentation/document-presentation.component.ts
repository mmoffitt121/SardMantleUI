import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EditBoolComponent } from '../../shared/document-components/edit/edit-bool/edit-bool.component';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { EditIntComponent } from '../../shared/document-components/edit/edit-int/edit-int.component';
import { EditDoubleComponent } from '../../shared/document-components/edit/edit-double/edit-double.component';
import { EditDataPointComponent } from '../../shared/document-components/edit/edit-data-point/edit-data-point.component';
import { EditArticleComponent } from '../../shared/document-components/edit/edit-article/edit-article.component';
import { EditSummaryComponent } from '../../shared/document-components/edit/edit-summary/edit-summary.component';
import { EditStringComponent } from '../../shared/document-components/edit/edit-string/edit-string.component';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ViewIntComponent } from '../../shared/document-components/view/view-int/view-int.component';
import { ViewDoubleComponent } from '../../shared/document-components/view/view-double/view-double.component';
import { ViewStringComponent } from '../../shared/document-components/view/view-string/view-string.component';
import { ViewSummaryComponent } from '../../shared/document-components/view/view-summary/view-summary.component';
import { ViewArticleComponent } from '../../shared/document-components/view/view-article/view-article.component';
import { ViewDataPointComponent } from '../../shared/document-components/view/view-data-point/view-data-point.component';
import { ViewBoolComponent } from '../../shared/document-components/view/view-bool/view-bool.component';
import { UrlService } from 'src/app/services/url/url.service';
import { Router } from '@angular/router';
import { DocumentLocationService } from 'src/app/services/document/document-location.service';
import { ViewLocationParamComponent } from '../../shared/document-components/view/view-location-param/view-location-param.component';
import { LoginService } from 'src/app/services/login/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ErrorService } from 'src/app/services/error.service';
import { ViewDatetimeComponent } from '../../shared/document-components/view/view-datetime/view-datetime.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { DataPointSearchCriteria } from 'src/app/models/pages/view';
import { DocumentIOService } from 'src/app/services/document/document-io.service';

@Component({
  selector: 'app-document-presentation',
  templateUrl: './document-presentation.component.html',
  styleUrls: ['./document-presentation.component.scss']
})
export class DocumentPresentationComponent implements OnInit, OnChanges {
  public document: QueriedDataPoint | undefined;

  @Input() id: number = -1;
  @Input() showEditControls = true;
  @Input() showLinkToSelf = false;
  @Input() showClose = false;
  @Input() dialogRef: MatDialogRef<any> | undefined = undefined;

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() deleted = new EventEmitter();

  public canAdd = false;

  public async setDocument(id: any) {
    if (id === undefined || id === "undefined" || id == -1) {
      this.document = undefined;
      return;
    }
    
    this.queryService.query({id, includeChildDataPoints: true} as DataPointSearchCriteria).subscribe(async data => {
      this.document = data.results[0];
    })
  }

  public navigateToSelf() {
    this.onClose();
    this.router.navigate([this.urlService.getWorld(), 'document', 'view', this.document?.id])
  }

  public onEdit() {
    this.onClose();
    this.router.navigate([this.urlService.getWorld(), 'document', 'edit', this.document?.id])
  }

  public onDelete() {
    var deleteMessage = `Are you sure you want to delete ${this.document?.name}?`;

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
    this.documentService.deleteDocument(this.document?.id ?? -1).subscribe(result => {
      this.errorService.showSnackBar(`Delete successful.`);
      this.deleted.emit();
      this.onClose();
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public onDuplicate() {
    this.onClose();
    this.router.navigate([this.urlService.getWorld(), 'document', 'duplicate', this.document?.id]);
  }

  public onEditType() {
    this.onClose();
    this.router.navigate([this.urlService.getWorld(), 'document-type', 'edit', this.document?.typeId]);
  }

  public onExport() {
    if (this.document) {
      this.ioService.export(this.document!);
    }
  }

  public clear() {
    this.document = undefined;
  }

  public onClose() {
    this.dialogRef?.close();
  }

  constructor (
    private documentService: DocumentService, 
    private router: Router,
    private urlService: UrlService,
    public loginService: LoginService,
    public dialog: MatDialog,
    public errorService: ErrorService,
    private queryService: ViewQueryService,
    private ioService: DocumentIOService
    ) { }

  ngOnInit(): void {
    if (this.id > -1) {
      this.setDocument(this.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.setDocument(this.id)
    }
  }
}

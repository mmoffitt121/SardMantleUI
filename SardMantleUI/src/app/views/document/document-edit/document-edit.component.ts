import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { EditIntComponent } from '../../shared/document-components/edit/edit-int/edit-int.component';
import { EditDoubleComponent } from '../../shared/document-components/edit/edit-double/edit-double.component';
import { EditStringComponent } from '../../shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from '../../shared/document-components/edit/edit-summary/edit-summary.component';
import { EditArticleComponent } from '../../shared/document-components/edit/edit-article/edit-article.component';
import { EditDataPointComponent } from '../../shared/document-components/edit/edit-data-point/edit-data-point.component';
import { EditBoolComponent } from '../../shared/document-components/edit/edit-bool/edit-bool.component';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ErrorService } from 'src/app/services/error.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
import { UnitsService } from 'src/app/services/units/units.service';
import { EditDatetimeComponent } from '../../shared/document-components/edit/edit-datetime/edit-datetime.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { take } from 'rxjs';
import { QueriedDataPoint, QueriedDataPointParameter } from 'src/app/models/document/document-query-result';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements AfterViewInit {
  public document: QueriedDataPoint;
  public selectedDocType: DocumentType | undefined;
  public documentType: DocumentType | undefined;
  public documentTypes: DocumentType[] = [];

  public addEditTitle: string = "Add Document";

  private docTypeId: number;

  public editing = false;
  public duplicating = false;

  public nameParam: QueriedDataPointParameter = {
    typeParameterId: -1,
    typeParameterName: "Name",
    typeParameterSequence: -1,
    value: "Name",
  } as QueriedDataPointParameter;

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public saveDocument(keepAdding: boolean) {
    this.document.name = this.nameParam.value;
    if (this.duplicating) {
      this.document.id = undefined;
    }
    this.documentService.putDocument(this.document).pipe(take(1)).subscribe(result => {
      this.errorService.showSnackBar(this.document.typeName + " " + this.document.name + " saved successfully.");
      if (keepAdding) {
        this.setDocumentType(this.document.typeId);
      } else {
        this.router.navigate([this.urlService.getWorld(), "document", "view", result])
      }
    });
  }

  public buildDocument() {

  }

  public setDocument(id: number) {
    this.documentService.getDocuments({id, includeTypes: true, includeChildDataPoints: true}).pipe(take(1)).subscribe(queryResult => {
      this.document = queryResult.results[0];
      this.documentType = queryResult.types[0];
      this.nameParam = {
        typeParameterId: -1,
        typeParameterName: "Name",
        typeParameterSequence: -1,
        value: this.document.name,
      } as QueriedDataPointParameter;
      this.setTitle();
    })
  }

  public setDocumentType(id: number) {
    this.nameParam = {
      typeParameterId: -1,
      typeParameterName: "Name",
      typeParameterSequence: -1,
      value: "Name",
    } as QueriedDataPointParameter;
    this.cdref.detectChanges();

    this.documentService.getNew(id).pipe(take(1)).subscribe(queryResult => {
      this.document = queryResult.results[0];
    })
  }

  public setDuplicating() {
    this.duplicating = true;
  }

  public setTitle() {
    if (this.duplicating) {
      this.addEditTitle = "Duplicating " + this.documentType?.name;
    } else if (this.editing) {
      this.addEditTitle = "Editing " + this.documentType?.name;
    } else {
      this.addEditTitle = "Adding " + this.documentType?.name;
    }
  }

  public loadDocumentTypes() {
    this.documentTypeService.getDocumentTypes(this.docTypeId ? {dataPointTypeIds: [this.docTypeId]} : {}).subscribe(data => {
      this.documentTypes = data;
      if (this.docTypeId) {
        this.selectedDocType = this.documentTypes.find(t => t.id == this.docTypeId) ?? undefined;
        this.cdref.detectChanges();
      }
    }, error => this.errorService.handle(error));
  }

  public canSave() {
    return !this.document;
  }

  public onCancel() {
    if (this.editing) {
      if (this.document?.id) {
        this.router.navigate([this.urlService.getWorld(), 'document', 'view', this.document?.id])
      } else {
        this.router.navigate([this.urlService.getWorld(), 'document'])
      }
    }
    else {
      this.cancel.emit();
    }
  }

  constructor(private cdref: ChangeDetectorRef, 
    private documentService: DocumentService, 
    private documentTypeService: DocumentTypeService,
    private themeService: ThemeService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private router: Router,
    private urlService: UrlService,
    private unitService: UnitsService,
    private calendarService: CalendarService,
    private route: ActivatedRoute) { 
      this.route.params.pipe(take(1)).subscribe(params => {
        if (params['docTypeId']) {
          this.docTypeId = params['docTypeId']
        }
      });
    }

  ngAfterViewInit(): void {
    this.loadDocumentTypes();
  }
}

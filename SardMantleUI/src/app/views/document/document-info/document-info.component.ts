import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef, Input } from '@angular/core';
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

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit, AfterViewInit {
  public document: Document | undefined;
  public documentType: DocumentType | undefined;
  public locations: Location[] | undefined;
  public relatedDocuments: Document[] | undefined;

  public title: string | undefined;
  public subtitle: string | undefined;

  private parameterComponents: any[] = [];

  @Input() autoLoadId: number = -1;
  @Input() showEditControls = true;
  @Input() showLinkToSelf = false;

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  @ViewChild('parameterContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  @ViewChild('locationContainer', { read: ViewContainerRef, static: false }) locationContainer: ViewContainerRef;
  @ViewChild('relatedDocumentContainer', { read: ViewContainerRef, static: false }) relatedDocumentContainer: ViewContainerRef;

  public canAdd = false;

  private loadDocument() {
    this.title = this.document?.name;
    this.subtitle = this.documentType?.name;
    this.container.clear();
    this.locationContainer.clear();
    this.relatedDocumentContainer.clear();
    this.parameterComponents = [];
    this.documentType?.typeParameters.forEach(p => {
      switch (p.typeValue) {
        case 'int':
          this.parameterComponents.push(this.container.createComponent(ViewIntComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.intValueString;
          break;
        case 'dub':
          this.parameterComponents.push(this.container.createComponent(ViewDoubleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.doubleValue;
          break;
        case 'str':
          this.parameterComponents.push(this.container.createComponent(ViewStringComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.stringValue;
          break;
        case 'sum':
          this.parameterComponents.push(this.container.createComponent(ViewSummaryComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.summaryValue;
          break;
        case 'doc':
          this.parameterComponents.push(this.container.createComponent(ViewArticleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.documentValue;
          break;
        case 'dat':
          this.parameterComponents.push(this.container.createComponent(ViewDataPointComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.dataPointValueId);
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(ViewBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue;
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = p.name;
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = p.summary;
    });

    this.locations?.forEach(l => {
      this.parameterComponents.push(this.locationContainer.createComponent(ViewLocationParamComponent));
      this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(l);
    });

    this.relatedDocuments?.forEach(d => {
      this.parameterComponents.push(this.relatedDocumentContainer.createComponent(ViewDataPointComponent));
      this.parameterComponents[this.parameterComponents.length - 1].instance.setDocument(d);
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = "";
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = "";
      this.parameterComponents[this.parameterComponents.length - 1].instance.viewDivider = false;
    })

    this.cdref.detectChanges();
  }

  private unloadDocument() {
    this.document = undefined;
    this.title = undefined;
    this.subtitle = undefined;
    this.container.clear();
    this.locations = undefined;
    this.locationContainer.clear();
    this.relatedDocuments = undefined;
    this.relatedDocumentContainer.clear();
    this.cdref.detectChanges();
  }

  public async setDocument(id: any) {
    if (id === undefined || id === "undefined" || id == -1) {
      this.document = undefined;
      return;
    }
    
    this.documentService.getDocument(id).subscribe(async data => {
      this.document = data;
      if (this.document != undefined) {
        this.documentTypeService.getDocumentType(this.document.typeId).subscribe(data => {
          this.documentType = data;
          this.documentLocationService.getLocationsFromDataPointId({id: this.document?.id}).subscribe(locs => {
            this.locations = locs;
            this.documentService.getDocumentsReferencingDocument(this.document?.id ?? -1).subscribe(references => {
              this.relatedDocuments = references;
              this.loadDocument();
            })
          })
        })
      }
    })
  }

  public setDocumentType(id: number) {
    if (id > 0) {
      this.documentTypeService.getDocumentType(id).subscribe(data => {
        this.documentType = data;
      })
    }
    else if (id == -1) {
      this.documentType = undefined;
    }
    this.unloadDocument();
  }

  public navigateToSelf() {
    this.router.navigate([this.urlService.getWorld(), 'document', this.document?.typeId, this.document?.id])
  }

  constructor(private cdref: ChangeDetectorRef, 
    private documentService: DocumentService, 
    private documentTypeService: DocumentTypeService,
    private router: Router,
    private urlService: UrlService,
    private documentLocationService: DocumentLocationService) { }

  ngOnInit(): void {
    if (this.autoLoadId > -1) {
      this.setDocument(this.autoLoadId);
    }
  }

  ngAfterViewInit(): void {
  }
}


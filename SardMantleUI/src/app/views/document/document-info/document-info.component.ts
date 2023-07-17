import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
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

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit, AfterViewInit {
  public document: Document | undefined;
  public documentType: DocumentType | undefined;

  public title: string | undefined;
  public subtitle: string | undefined;

  private parameterComponents: any[] = [];

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  @ViewChild('parameterContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  private loadDocument() {
    this.title = this.document?.name;
    this.subtitle = this.documentType?.name;
    this.container.clear();
    this.parameterComponents = [];
    this.documentType?.typeParameters.forEach(p => {
      switch (p.typeValue) {
        case 'int':
          this.parameterComponents.push(this.container.createComponent(ViewIntComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.intValue;
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
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.dataPointValue;
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(ViewBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.value = this.document?.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue;
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = p.name;
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = p.summary;
    });

    this.cdref.detectChanges();
  }

  public setDocument(id: any) {
    if (id === undefined || id === "undefined" || id == -1) {
      this.document = undefined;
      return;
    }
    console.log(id);
    this.documentService.getDocument(id).subscribe(data => {
      this.document = data;
      if (this.document != undefined) {
        this.documentTypeService.getDocumentType(this.document.typeId).subscribe(data => {
          this.documentType = data;
          this.loadDocument();
        })
      }
    })
  }

  public setDocumentType(id: number) {
    if (this.document == undefined && id > 0) {
      this.documentTypeService.getDocumentType(id).subscribe(data => {
        this.documentType = data;
      })
    }
    else if (this.document == undefined && id == -1) {
      this.documentType = undefined;
    }
  }

  constructor(private cdref: ChangeDetectorRef, 
    private documentService: DocumentService, 
    private documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}


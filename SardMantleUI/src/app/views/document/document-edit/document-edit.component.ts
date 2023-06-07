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

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements AfterViewInit {
  public document: Document;
  public documentType: DocumentType | undefined;

  public addEditTitle: string;

  private parameterComponents: any[] = [];

  public nameControl = new FormControl();

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('parameterContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  private loadDocument() {
    this.container.clear();
    this.parameterComponents = [];
    this.nameControl.setValue(this.document.name);
    this.documentType?.typeParameters.forEach(p => {
      switch (p.typeValue) {
        case 'int':
          this.parameterComponents.push(this.container.createComponent(EditIntComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.intValue
          );
          break;
        case 'dub':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.doubleValue
          );
          break;
        case 'str':
          this.parameterComponents.push(this.container.createComponent(EditStringComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.stringValue
          );
          break;
        case 'sum':
          this.parameterComponents.push(this.container.createComponent(EditSummaryComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.summaryValue
          );
          break;
        case 'doc':
          this.parameterComponents.push(this.container.createComponent(EditArticleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.documentValue
          );
          break;
        case 'dat':
          this.parameterComponents.push(this.container.createComponent(EditDataPointComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.dataPointValue
          );
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(EditBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue
          );
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = p.name;
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = p.summary;
    });
    this.cdref.detectChanges();

    //console.log(this.nameFieldControl)
  }

  public setDocument(id: number) {
    this.documentService.getDocument(id).subscribe(data => {
      this.document = data;
      this.documentTypeService.getDocumentType(this.document.typeId).subscribe(data => {
        this.documentType = data;
        this.loadDocument();
        this.addEditTitle = "Editing " + this.documentType?.name;
      })
    })
  }

  public setDocumentType(id: number) {
    this.document = {} as Document;
    this.documentTypeService.getDocumentType(id).subscribe(data => {
      this.documentType = data;
      this.loadDocument();
      this.addEditTitle = "Adding " + this.documentType?.name;
    })
  }

  constructor(private cdref: ChangeDetectorRef, 
    private documentService: DocumentService, 
    private documentTypeService: DocumentTypeService) { }

  ngAfterViewInit(): void {
  }
}

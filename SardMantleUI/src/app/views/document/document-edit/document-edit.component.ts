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
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
import { UnitsService } from 'src/app/services/units/units.service';
import { EditDatetimeComponent } from '../../shared/document-components/edit/edit-datetime/edit-datetime.component';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements AfterViewInit {
  public document: Document;
  public documentType: DocumentType | undefined;
  public documentTypes: DocumentType[] = [];

  public addEditTitle: string = "Add Document";

  public editing = false;

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
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.intValueString
          );
          break;
        case 'dub':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.doubleValue
          );
          break;
        case 'str':
          this.parameterComponents.push(this.container.createComponent(EditStringComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.stringValue
          );
          break;
        case 'sum':
          this.parameterComponents.push(this.container.createComponent(EditSummaryComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.summaryValue
          );
          break;
        case 'doc':
          this.parameterComponents.push(this.container.createComponent(EditArticleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.documentValue
          );
          break;
        case 'dat':
          this.parameterComponents.push(this.container.createComponent(EditDataPointComponent));
          let param = this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)
          this.parameterComponents[this.parameterComponents.length - 1].instance.setTypeId(p.dataPointTypeReferenceId ?? -1);
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(param);
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(EditBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(
            this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id)?.boolValue
          );
          break;
        case 'uni':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          let unitParam = this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id);
          let instance = this.parameterComponents[this.parameterComponents.length - 1].instance
          instance.setValue(unitParam?.unitValue);
          if (unitParam?.unitvalue === undefined) {
            this.unitService.get({id: p.dataPointTypeReferenceId}).subscribe(units => {
              instance.setUnit(units[0])
            })
          }
          else { instance.setUnit(unitParam?.unit) };
          break;
        case 'tim':
          let timeComponent = this.container.createComponent(EditDatetimeComponent);
          let timeSettings = JSON.parse(p.settings) ?? {};
          if (timeSettings.calendar) {
            timeComponent.instance.calendar = this.calendarService.calendars.find(cal => cal.id == timeSettings.calendar) ?? this.calendarService.selectedCalendar;
            if (timeSettings.formatter) {
              timeComponent.instance.formatter = timeComponent.instance.calendar.formatters.find(f => timeSettings.formatter == f.id) ?? timeComponent.instance.calendar.formatters[0];
            }
          }
          timeComponent.instance.thick = true;
          
          let timeParam = this.document.parameters?.find(x => x?.dataPointTypeParameterId == p.id);
          if (timeParam) {
            timeComponent.instance.setValue(timeParam.timeValue);
          }

          this.parameterComponents.push(timeComponent);
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = p.name;
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = p.summary;
      this.parameterComponents[this.parameterComponents.length - 1].instance.typeParameterId = p.id;
    });
    this.cdref.detectChanges();
  }

  public saveDocument() {
    this.documentService.putDocument(this.buildDocument()).subscribe(result => {
      this.errorService.showSnackBar(`${this.document.name} successfully saved.`);
      this.router.navigate([this.urlService.getWorld(), 'document', 'view', result])
    }, error => {
      this.errorService.handle(error);
    })
  }

  public buildDocument() {
    let params = [] as any[];
    this.parameterComponents.forEach(p => {
      var param = {};
      switch (this.documentType?.typeParameters.find(tp => tp.id == p.instance.typeParameterId )?.typeValue) {
        case 'int':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            intValueString: p.instance.getValue()
          }
          break;
        case 'dub':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            doubleValue: p.instance.getValue()
          }
          break;
        case 'str':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            stringValue: p.instance.getValue()
          }
          break;
        case 'sum':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            summaryValue: p.instance.getValue()
          }
          break;
        case 'doc':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            documentValue: p.instance.getValue()
          }
          break;
        case 'dat':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            dataPointValueId: p.instance.getValue()
          }
          break;
        case 'bit':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            boolValue: p.instance.getValue()
          }
          break;
        case 'uni':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            unitValue: p.instance.getValue()
          }
          break;
        case 'tim':
          param = {
            dataPointId: this.document.id,
            dataPointTypeParameterId: p.instance.typeParameterId,
            timeValue: p.instance.getValue()?.toString()
          }
          break;
      }
      if (p.instance.getValue() !== null) {
        params.push(param);
      }
    });
    this.document.parameters = params;
    this.document.name = this.nameControl.value;
    return(this.document);
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
    this.document = {
      name: "New",
      summary: "",
      parameters: [] as any[],
      typeId: id} as Document;
    this.documentTypeService.getDocumentType(id).subscribe(data => {
      this.documentType = data;
      this.loadDocument();
      this.addEditTitle = "Adding " + this.documentType?.name;
    })
  }

  public loadDocumentTypes() {
    this.documentTypeService.getDocumentTypes({}).subscribe(data => this.documentTypes = data, error => this.errorService.handle(error));
  }

  public canSave() {
    return !this.document;
  }

  public onCancel() {
    if (this.editing) {
      this.router.navigate([this.urlService.getWorld(), 'document', 'view', this.document?.id])
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
    private calendarService: CalendarService) { }

  ngAfterViewInit(): void {
    this.loadDocumentTypes();
  }
}

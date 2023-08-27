import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-edit-type-parameter-data-point',
  templateUrl: './edit-type-parameter-data-point.component.html',
  styleUrls: ['./edit-type-parameter-data-point.component.scss']
})
export class EditTypeParameterDataPointComponent {
  public documentTypes: DocumentType[];
  public documentTypeParameter: DocumentTypeParameter;
  public selectedDocumentType: DocumentType | null;
  public anyDataType = new FormControl();

  public setValues(p: DocumentTypeParameter) {
    this.documentTypeParameter = p;
    this.typeService.getDocumentTypes({}).subscribe(data => this.documentTypes = data, error => this.errorService.handle(error))
    if (p.dataPointTypeReferenceId !== null && p.dataPointTypeReferenceId > -1) {
      this.typeService.getDocumentType(p.dataPointTypeReferenceId ?? -1).subscribe(data => { 
        this.selectedDocumentType = data
      }, 
      error => this.errorService.handle(error));
    }
    else {
      this.anyDataType.setValue(true);
      this.selectedDocumentType = null;
    }
  }

  public anyDataTypeValueChanged(event: any) {
    if (event) {
      this.documentTypeParameter.dataPointTypeReferenceId = -1;
    }
    else {
      this.documentTypeParameter.dataPointTypeReferenceId = this.selectedDocumentType?.id ?? -1;
    }
  }

  public select(e: any) {
    if (e === undefined) return;
    this.selectedDocumentType = e;
    this.documentTypeParameter.dataPointTypeReferenceId = e.id;
    this.anyDataType.setValue(false);
  }

  public constructor (private typeService: DocumentTypeService, private errorService: ErrorService, private cdref: ChangeDetectorRef) {}
}

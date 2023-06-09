import { Component, ViewChild } from '@angular/core';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { EditStringComponent } from 'src/app/views/shared/document-components/edit/edit-string/edit-string.component';
import { EditSummaryComponent } from 'src/app/views/shared/document-components/edit/edit-summary/edit-summary.component';

@Component({
  selector: 'app-edit-type-parameter',
  templateUrl: './edit-type-parameter.component.html',
  styleUrls: ['./edit-type-parameter.component.css']
})
export class EditTypeParameterComponent {
  @ViewChild('titleComponent') titleComponent: EditStringComponent;
  @ViewChild('summaryComponent') summaryComponent: EditSummaryComponent;

  public parameter: DocumentTypeParameter;

  public onTitleChanged(event: any) {
    this.parameter.name = event;
  }
  
  public onSummaryChanged(event: any) {
    this.parameter.summary = event;
  }

  public setValues(p: DocumentTypeParameter) {
    console.log(p)
    this.parameter = p;
    this.titleComponent.setValue(p.name);
    this.summaryComponent.setValue(p.summary);
  }
}

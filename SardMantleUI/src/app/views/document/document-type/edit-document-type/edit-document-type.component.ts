import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DocumentIconMaps } from 'src/app/models/document/document-icon-maps/document-icon-maps';
import { EditDocumentTypePropertiesComponent } from './edit-document-type-properties/edit-document-type-properties.component';
import { EditTypeParameterComponent } from './edit-type-parameter/edit-type-parameter.component';

@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.css']
})
export class EditDocumentTypeComponent {
  private id: number;
  public documentType: DocumentType;
  public title: string;
  public subtitle: string;

  public parameterSelected = false;

  public iconMap = new DocumentIconMaps();

  @ViewChild('editPropertiesComponent') editPropertiesComponent: EditDocumentTypePropertiesComponent;
  @ViewChild('editParameterComponent') editParameterComponent: EditTypeParameterComponent;

  public returnToDocument() {
    this.router.navigate(['/document']);
  }

  select(parameter: any) {
    this.selectParameter(parameter.sequence);
  }

  add() {

  }

  save() {
    this.typeService.putDocumentType(this.documentType).subscribe(result => {

    },
    (error: any) => {
      console.log(error);
    });
  }

  drop(event: any) {
    moveItemInArray(this.documentType.typeParameters, event.previousIndex, event.currentIndex);

    for (let i = 0; i < this.documentType.typeParameters.length; i++) {
      this.documentType.typeParameters[i].sequence = i;
    }
  }

  public selectType() {
    this.documentType.typeParameters.forEach(p => {
      p.selected = false;
    })
    this.parameterSelected = false;
    this.cdref.detectChanges();
    this.editPropertiesComponent.setValues(this.documentType);
  }

  public selectParameter(sequence: number) {
    this.parameterSelected = true;
    this.documentType.typeParameters.forEach(p => {
      if (p.sequence == sequence) {
        p.selected = true;
      }
      else {
        p.selected = false;
      }
    })
    this.cdref.detectChanges();
    var param = this.documentType.typeParameters.find(p => p.sequence == sequence);
    if (param != null) {
      this.editParameterComponent.setValues(param);
    }
  }

  public handleTitleChanged(title: any) {
    this.documentType.name = title;
  }

  public handleSummaryChanged(summary: any) {
    this.documentType.summary = summary;
  }

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    private typeService: DocumentTypeService,
    private cdref: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => this.id = params['id'])
    this.typeService.getDocumentType(this.id).subscribe(data => {
      this.documentType = data;

      if (this.id == -1) {
        this.title = "Add Document Type";
        this.subtitle = "Create parameters for the new data type."
      }
      else {
        this.title = this.documentType.name;
        this.subtitle = this.documentType.summary;
        this.editPropertiesComponent.setValues(this.documentType);
      }
    })
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

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

  public returnToDocument() {
    this.router.navigate(['/document']);
  }

  select(parameter: any) {
    this.selectParameter(parameter.sequence);
  }

  drop(event: any) {
    moveItemInArray(this.documentType.typeParameters, event.previousIndex, event.currentIndex);

    for (let i = 0; i < this.documentType.typeParameters.length; i++) {
      this.documentType.typeParameters[i].sequence = i;
    }
  }

  public selectParameter(sequence: number) {
    this.documentType.typeParameters.forEach(p => {
      if (p.sequence == sequence) {
        p.selected = true;
      }
      else {
        p.selected = false;
      }
    })
  }

  constructor (private route: ActivatedRoute, public router: Router, private typeService: DocumentTypeService) {
    this.route.params.subscribe(params => this.id = params['id'])
    typeService.getDocumentType(this.id).subscribe(data => {
      this.documentType = data;

      if (this.id == -1) {
        this.title = "Add Document Type";
        this.subtitle = "Create parameters for the new data type."
      }
      else {
        this.title = this.documentType.name;
        this.subtitle = this.documentType.summary;
      }
    })
  }
}

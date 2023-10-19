import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DocumentIconMaps } from 'src/app/models/document/document-icon-maps/document-icon-maps';
import { EditDocumentTypePropertiesComponent } from './edit-document-type-properties/edit-document-type-properties.component';
import { EditTypeParameterComponent } from './edit-type-parameter/edit-type-parameter.component';
import { ErrorService } from 'src/app/services/error.service';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { ErrorToastComponent } from 'src/app/views/shared/error-toast/error-toast.component';
import { MatDialog } from '@angular/material/dialog';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.scss']
})
export class EditDocumentTypeComponent {
  private id: number;
  public documentType: DocumentType;
  public title: string;
  public subtitle: string;

  public saving = false;

  public parameterSelected = false;

  public iconMap = new DocumentIconMaps();

  @ViewChild('editPropertiesComponent') editPropertiesComponent: EditDocumentTypePropertiesComponent;
  @ViewChild('editParameterComponent') editParameterComponent: EditTypeParameterComponent;

  public returnToDocument() {
    this.router.navigate([this.urlService.getWorld(), 'document', 'type']);
  }

  select(parameter: any) {
    this.selectParameter(parameter.sequence);
  }

  add(typeValue: string) {
    var param: DocumentTypeParameter = {
      dataPointTypeId: this.documentType.id,
      id: null,
      name: "New " + (this.iconMap.nameMap.get(typeValue) ? this.iconMap.nameMap.get(typeValue) as string : "") + " Parameter",
      sequence: this.documentType.typeParameters.length,
      summary: "",
      typeValue: typeValue,
      selected: false,
      dataPointTypeReferenceId: -1
    };

    this.documentType.typeParameters = this.documentType.typeParameters.concat(param);
  }

  delete() {
    this.saving = true;
    this.typeService.deleteDocumentType(this.documentType.id).subscribe(result => {
      this.errorHandler.showSnackBar("Data Type " + this.documentType.name + " deleted successfully.");
      this.saving = false;
      this.returnToDocument();
    },
    error => {
      this.errorHandler.handle(error);
      this.saving = false;
    });
  }

  public confirmDelete() {
    var deleteMessage = (this.documentType.name) ? 
    ("Are you sure you want to delete data type " + (this.documentType.name) + "?") : 
    ("Are you sure you want to delete this data type?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: deleteMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  save() {
    this.saving = true;
    this.typeService.putDocumentType(this.documentType).subscribe(result => {
      this.errorHandler.showSnackBar("Data Type " + this.documentType.name + " saved successfully.");
      this.saving = false;
      this.returnToDocument();
    },
    (error: any) => {
      this.errorHandler.handle(error);
      this.saving = false;
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

  public deleteParameter(param : any) {
    this.documentType.typeParameters = this.documentType.typeParameters.filter(p => p != param);
  }

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    private typeService: DocumentTypeService,
    private dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private errorHandler: ErrorService,
    private urlService: UrlService
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

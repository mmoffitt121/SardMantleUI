import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPointQueryResult, QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { Document } from 'src/app/models/document/document-types/document';
import { Location } from 'src/app/models/map/location-data-types/location-data-types';
import { DocumentLocationService } from 'src/app/services/document/document-location.service';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { EditDataPointComponent } from 'src/app/views/shared/document-components/edit/edit-data-point/edit-data-point.component';

@Component({
  selector: 'app-edit-document-locations',
  templateUrl: './edit-document-locations.component.html',
  styleUrls: ['./edit-document-locations.component.scss']
})
export class EditDocumentLocationsComponent {
  public title: string;
  public content: string;
  public location: Location;
  public documents: DataPointQueryResult;

  @ViewChild('editDataPointComponent') editDataPointComponent: EditDataPointComponent;

  public adding: boolean;

  public done() {
    this.dialogRef.close();
  }

  public loadDocumentLocations() {
    this.documentLocationService.getDataPointsFromLocationId({id: this.location.id}).subscribe(data => {
      this.documents = data;
    })
  }

  public addLinkToDocument() {
    this.adding = true;
  }

  public cancelAdd() {
    this.adding = false;
  }

  public editDocument(doc: QueriedDataPoint) {
    this.router.navigate([this.urlService.getWorld(), 'document', doc.typeId, doc.id]);
    this.dialogRef.close();
  }

  public removeLink(doc: QueriedDataPoint) {
    this.documentLocationService.deleteDataPointLocation({dataPointId: doc.id, locationId: this.location.id, isPrimary: false}).subscribe(result => {
      this.errorService.showSnackBar("Link successfully removed.");
      this.loadDocumentLocations();
    },
    error => this.errorService.handle(error))
  }

  public save() {
    this.documentLocationService.postDataPointLocation({dataPointId: this.editDataPointComponent.getValue(), locationId: this.location.id, isPrimary: false}).subscribe(result => {
      this.errorService.showSnackBar("Link successfully added.");
      this.loadDocumentLocations();
      this.adding = false;
    },
    error => this.errorService.handle(error))
  }

  public makePrimary(doc: QueriedDataPoint) {
    this.documentLocationService.postDataPointLocation({dataPointId: doc.id, locationId: this.location.id, isPrimary: true}).subscribe(result => {
      this.errorService.showSnackBar("Link successfully made primary.");
      this.loadDocumentLocations();
      this.adding = false;
    },
    error => this.errorService.handle(error));
  }

  public addDocument() {
    this.router.navigate([this.urlService.getWorld(), 'document', 'add']);
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EditDocumentLocationsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentLocationService: DocumentLocationService,
    private errorService: ErrorService,
    private router: Router,
    private urlService: UrlService
    ) { }

  ngOnInit(): void {
    this.location = this.data.location;
    this.loadDocumentLocations();
  }
}

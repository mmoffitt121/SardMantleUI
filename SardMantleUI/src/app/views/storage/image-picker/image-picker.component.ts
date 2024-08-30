import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { PaginatableComponent } from '../../shared/util/paginatable/paginatable.component';
import { ImageService } from 'src/app/services/image/image.service';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent extends PaginatableComponent implements OnInit {
  public images: Image[];
  public baseUrl = environment.baseUrl;
  public query = "";
  @Output() select = new EventEmitter();
  @Input() previewImages =  true;
  @Input() topbar = true;
  public search(query: any) {
    this.query = query;
    let criteria = {pageNumber: this.pageIndex, pageSize: this.pageSize, query};
    this.imageService.getImages(criteria).pipe(take(1)).subscribe(result => {
      this.images = result;
    });
    this.imageService.getImageCount(criteria).pipe(take(1)).subscribe(result => {
      this.pageLength = result;
    });
  }

  public navigate() {
    this.search(this.query);
  }

  public onClick(image: Image) {
    if (this.dialogRef) {
      this.dialogRef.close(image.id)
    }
    this.select.emit(image)
  }

  public add() {
    if (this.dialogRef) {
      let dialogRef = this.dialog.open(ImageUploaderComponent, {
        width: '500px',
        data: { 
          title: "Upload Image", 
        },
      });
  
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        this.dialogRef.close(result);
      })
    }
  }

  constructor (
    private imageService: ImageService, 
    @Optional() public dialogRef: MatDialogRef<ImagePickerComponent>, 
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.pageIndex = 0;
    this.pageSize = 25;
    this.search("")
  }
}

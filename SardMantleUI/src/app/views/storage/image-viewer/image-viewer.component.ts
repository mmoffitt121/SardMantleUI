import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {
  public image: Image;
  public src: any;
  public loading = true;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.src = reader.result;
    }, false);
  
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  constructor(public dialogRef: MatDialogRef<ImageViewerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.image = this.data.image;
    this.imageService.image(this.image.id).pipe(take(1)).subscribe((image: any) => {
      this.createImageFromBlob(image as Blob);
      this.loading = false;
    })
  }
}

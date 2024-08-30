import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ErrorService } from 'src/app/services/error.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  providers: [DatePipe]
})
export class ImageViewerComponent {
  public image: Image;
  public src: any;
  public loading = true;

  public viewerOptions: any = {
    navbar: false,
    toolbar: {
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 0,
      play: {
        show: 4,
        size: 'large',
      },
      next: 0,
      rotateLeft: 4,
      rotateRight: 4,
      flipHorizontal: 4,
      flipVertical: 4,
    },
    title: 0,
    zoomRatio: 0.5
  }

  createImageFromBlob(image: Blob) {
    if (image) {
      let newUrl = URL.createObjectURL(image);
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    }
  }

  public delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { title: "Confirm Deletion", content: "Are you sure you want to delete this image?" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imageService.deleteImage(this.image.id).subscribe(result => {
          this.errorService.showSnackBar("Image successfully deleted");
          this.dialogRef.close(true);
        }, error => {
          this.errorService.handle(error)
        })
      }
    });
  }

  public info() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Image Info", 
        content: this.image.description, 
        showCancel: false,
        confirmText: "Done",
        lines: [
          "Size: " + (this.image.size / 1000) + " kb",
          "Creation Date: " + this.datePipe.transform(this.image.creationDate),
          "File Type: " + this.image.extension,
        ]
      },
    });
  }

  constructor(public dialogRef: MatDialogRef<ImageViewerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private errorService: ErrorService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.image = this.data.image;
    this.imageService.image(this.image.id).pipe(take(1)).subscribe((image: any) => {
      this.createImageFromBlob(image as Blob);
      this.loading = false;
    })
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { take } from 'rxjs';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { Image } from 'src/app/models/content/image';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent {
  @ViewChild('picker') picker: ImagePickerComponent;

  public uploadImage() {
    let dialogRef = this.dialog.open(ImageUploaderComponent, {
      width: '500px',
      data: { 
        title: "Upload Image", 
      }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.picker.ngOnInit();
    })
  }

  public selectImage(image: Image) {
    let dialogRef = this.dialog.open(ImageViewerComponent, {
      data: { 
        image: image, 
      }
    });
  }
  
  constructor(private dialog: MatDialog) {}
}

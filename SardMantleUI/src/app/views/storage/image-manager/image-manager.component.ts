import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePickerComponent } from '../image-picker/image-picker.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent {
  public uploadImage() {
    this.dialog.open(ImageUploaderComponent, {
      width: '500px',
      data: { 
        title: "Upload Image", 
      }
    });
  }
  
  constructor(private dialog: MatDialog) {}
}

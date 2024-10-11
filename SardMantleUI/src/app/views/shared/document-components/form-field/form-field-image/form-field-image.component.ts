import { Component } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { MatDialog } from '@angular/material/dialog';
import { ImagePickerComponent } from 'src/app/views/storage/image-picker/image-picker.component';

@Component({
  selector: 'app-form-field-image',
  templateUrl: './form-field-image.component.html',
  styleUrls: ['./form-field-image.component.scss']
})
export class FormFieldImageComponent extends FormFieldBasicComponent {
  public onClick() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: 'min(100vw, 700px)',
      height: 'min(100vh, 700px)',
      data: { title: "Upload File" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parameter.value = result;
        this.valueChanged.emit(result);
      }
    });
  }

  constructor(private dialog: MatDialog) {
    super();
  }
}

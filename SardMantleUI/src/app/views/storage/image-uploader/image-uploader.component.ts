import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  public file: any;

  public title: string;
  public content: string;
  public fileName: string;

  public loading = false;
  public saving = false;

  public description: string = "";

  public tempUrl: string = "";

  @Input() options: string = ".jpg, .jpeg, .png";

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();


  public cancelChoice() {
    this.dialogRef.close(false);
  }

  public confirmChoice() {
    this.saving = true;
    if (!this.description) {
      this.description = this.fileName;
    }
    this.imageService.postImage(this.file, this.fileName, this.description).pipe(take(1)).subscribe((result: any) => {
      this.saving = false;
      this.dialogRef.close(result.id);
    })
  }
  
  public onFileSelected() {
    this.loading = true;
    const inputNode: any = document.querySelector('#file');
    if (!inputNode.files[0]) {
      return;
    }
    this.fileName = inputNode.files[0].name;
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.file = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);

      const reader2 = new FileReader();
      reader2.onload = (e: any) => {
        this.tempUrl = e.target.result;
      };
      reader2.readAsDataURL(inputNode.files[0]);
      this.loading = false;
    }
  }

  constructor(public dialogRef: MatDialogRef<ImageUploaderComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
    if (this.data.options) {
      this.options = this.data.options
    }
  }
}

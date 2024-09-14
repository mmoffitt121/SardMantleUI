import { Component, Output, EventEmitter, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public file: File;
  public files: File[] = [];

  public title: string;
  public content: string;
  public fileName: string;
  public fileNames: string[] = [];
  public multiple: boolean;

  @Input() options: string = ".jpg, .jpeg, .png";

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<UploadFileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
    if (this.data.options) {
      this.options = this.data.options
    }
    this.multiple = this.data.multiple ?? false;
  }

  public cancelChoice() {
    this.dialogRef.close(false);
  }

  public confirmChoice() {
    this.dialogRef.close({file: this.file, fileName: this.fileName, files: this.files, fileNames: this.fileNames});
  }
  
  public onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    this.fileName = "";
    this.fileNames = [];
    for (let i = 0; i < inputNode.files.length; i++) {  
      this.fileName += inputNode.files[i].name + " ";
      this.fileNames.push(inputNode.files[i].name);
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          if (this.multiple) {
            this.files.push(e.target.result);
          } else {
            this.file = e.target.result;
          }
        };
    
        reader.readAsArrayBuffer(inputNode.files[i]);
      }
    }
  }
}

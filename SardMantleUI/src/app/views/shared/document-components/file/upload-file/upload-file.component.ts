import { Component, Output, EventEmitter, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  public file: any;

  public title: string;
  public content: string;
  public fileName: string;

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
  }

  public cancelChoice() {
    this.dialogRef.close();
  }

  public confirmChoice() {
    this.dialogRef.close(this.file);
  }
  
  public onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    this.fileName = inputNode.files[0].name;
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.file = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}

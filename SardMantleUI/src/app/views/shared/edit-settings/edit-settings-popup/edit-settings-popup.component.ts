import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-settings-popup',
  templateUrl: './edit-settings-popup.component.html',
  styleUrls: ['./edit-settings-popup.component.scss']
})
export class EditSettingsPopupComponent {
  public settings: any[] = [];
  public data: any;
  public category: any;

  public onCancel() {

  }

  public onSave(event: any) {
    
  }

  public onChange(event: any) {

  }

  constructor(public dialogRef: MatDialogRef<EditSettingsPopupComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData) {
      this.settings = dialogData.settings;
      this.data = dialogData.data;
      this.category = dialogData.category;
    }
  }
}

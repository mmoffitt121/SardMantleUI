import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrls: ['./edit-string.component.css']
})
export class EditStringComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public control = new FormControl();

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    return this.control.value;
  }
}

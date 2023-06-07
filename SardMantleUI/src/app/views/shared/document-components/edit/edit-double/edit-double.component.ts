import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-double',
  templateUrl: './edit-double.component.html',
  styleUrls: ['./edit-double.component.css']
})
export class EditDoubleComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public control = new FormControl();

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }
}

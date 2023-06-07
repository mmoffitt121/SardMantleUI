import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-data-point',
  templateUrl: './edit-data-point.component.html',
  styleUrls: ['./edit-data-point.component.css']
})
export class EditDataPointComponent {
  formControl = new FormControl();
  public filteredItems: any[];
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.formControl.setValue(value);
  }

  public handleBlur() {

  }

  public handleSelectionChange(event: any) {

  }
}

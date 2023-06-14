import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-int',
  templateUrl: './edit-int.component.html',
  styleUrls: ['./edit-int.component.scss']
})
export class EditIntComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() control = new FormControl();
  @Input() required: boolean = false;

  public validate(e: any) {
    this.control.markAsTouched();
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    return this.control.value;
  }

  ngOnInit() {
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }
  }
}

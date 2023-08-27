import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-double',
  templateUrl: './edit-double.component.html',
  styleUrls: ['./edit-double.component.scss']
})
export class EditDoubleComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = '';
  @Input() control = new FormControl();
  @Input() required: boolean = false;

  public typeParameterId: number;
  private previousValue: any;

  public validate(e: any) {
    this.control.markAsTouched();
    if (this.control.value.match(/[\-]?([0-9]*)[\.]?([0-9]*)/g).length > 2) {
      this.control.setValue(this.previousValue);
    }
    else {
      this.previousValue = this.control.value;
    }
    let newValue = this.control.value.replace(/[^\-0-9.]/g, "");
    newValue = newValue.replace(/(?<!^)[\-]/g, "");
    let split = newValue.split(".");
    this.control.setValue(newValue);
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    if (this.control.value === "-") {
      this.control.setValue("");
    }
    return this.control.value;
  }

  ngOnInit() {
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }
  }
}

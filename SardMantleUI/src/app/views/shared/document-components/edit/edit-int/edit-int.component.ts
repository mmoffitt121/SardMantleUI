import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-int',
  templateUrl: './edit-int.component.html',
  styleUrls: ['./edit-int.component.scss']
})
export class EditIntComponent implements OnInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() control = new FormControl();
  @Input() required: boolean = false;
  @Input() placeholder: string = "Number"
  @Input() canDelete = false;
  @Input() thin = false;
  public index: number;

  @Output() valueChanged = new EventEmitter();
  @Output() delete = new EventEmitter();

  public typeParameterId: number;

  public validate(e: any) {
    this.control.markAsTouched();
    let newValue = this.control.value.replace(/[^\-0-9]/g, "");
    newValue = newValue.replace(/(?<!^)[\-]/g, "");
    this.control.setValue(newValue);
    if (this.control.value > 9223372036854775807n) { this.control.setValue(9223372036854775807n) }
    if (this.control.value < -9223372036854775808n) { this.control.setValue(-9223372036854775808n) }
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    return this.control.value !== undefined ? this.control.value + "" : undefined;
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => this.valueChanged.emit({value, index: this.index}))
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }
  }
}

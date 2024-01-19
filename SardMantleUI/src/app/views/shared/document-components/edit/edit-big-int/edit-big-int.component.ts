import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-big-int',
  templateUrl: './edit-big-int.component.html',
  styleUrls: ['./edit-big-int.component.scss']
})
export class EditBigIntComponent implements OnInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() control = new FormControl();
  @Input() required: boolean = false;
  @Input() placeholder: string = "Number"
  @Input() canDelete = false;
  @Input() thin = false;
  @Input() minValue: number | undefined = undefined;
  @Input() maxValue: number | undefined = undefined;
  public index: number;

  @Output() valueChanged = new EventEmitter();
  @Output() delete = new EventEmitter();

  public typeParameterId: number;

  @Input() model: bigint;
  @Output() modelChange = new EventEmitter<bigint>();

  public validate(e: any) {
    this.control.markAsTouched();
    let newValue = this.control.value.replace(/[^\-0-9]/g, "");
    newValue = newValue.replace(/(?<!^)[\-]/g, "");
    this.control.setValue(newValue);
    let min = this.minValue;
    let max = this.maxValue;
    if (min != undefined && this.control.value < min) { this.control.setValue(min) }
    if (max != undefined && this.control.value > max) { this.control.setValue(max) }
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
    this.model = value;
    this.modelChange.emit(value);
  }

  public getValue() {
    return this.control.value !== undefined ? this.control.value + "" : undefined;
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.model = value;
      this.valueChanged.emit({value, index: this.index})
      this.modelChange.emit(this.model);
    });
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }

    this.control.setValue(this.model);
  }
}

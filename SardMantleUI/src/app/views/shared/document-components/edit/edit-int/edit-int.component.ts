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
  @Input() minValue: number | undefined = undefined;
  @Input() maxValue: number | undefined = undefined;
  public index: number;

  @Input() displayFilterOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 0, name: "Equals"},
    { filterMode: 6, name: "Less Than"},
    { filterMode: 5, name: "Greater Than"},
  ];
  @Input() public selectedFilterOption = { filterMode: 0, name: "Equals"};

  @Output() valueChanged = new EventEmitter();
  @Output() delete = new EventEmitter();

  public typeParameterId: number;

  @Input() model: number;
  @Output() modelChange = new EventEmitter<number>();

  public validate(e: any) {
    this.control.markAsTouched();
    let newValue = this.control.value.replace(/[^\-0-9]/g, "");
    newValue = newValue.replace(/(?<!^)[\-]/g, "");
    this.control.setValue(newValue);
    let min = this.minValue ?? -9223372036854775808n;
    let max = this.maxValue ?? 9223372036854775807n;
    if (this.control.value < min) { this.control.setValue(min) }
    if (this.control.value > max) { this.control.setValue(max) }
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

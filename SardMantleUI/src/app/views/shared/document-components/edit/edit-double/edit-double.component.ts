import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Unit } from 'src/app/models/units/unit';

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

  @Input() displayFilterOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 0, name: "Equals"},
    { filterMode: 6, name: "Less Than"},
    { filterMode: 5, name: "Greater Than"},
  ];
  @Input() public selectedFilterOption = { filterMode: 0, name: "Equals"};

  @Output() onChanges = new EventEmitter();

  public unit: Unit | undefined;

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

    this.onChanges.emit(newValue);
  }

  public openUnitMenu() {
    
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

  public setUnit(unit: any) {
    this.unit = unit;
  }

  ngOnInit() {
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-bool',
  templateUrl: './edit-bool.component.html',
  styleUrls: ['./edit-bool.component.scss']
})
export class EditBoolComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = '';
  @Input() control = new FormControl();
  @Input() default = false;
  @Input() required: boolean = false;

  @Input() displaySearchOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 7, name: "True"},
    { filterMode: 8, name: "False"},
    { filterMode: 0, name: "Don't Filter"},
  ];
  @Input() public selectedFilterOption = { filterMode: 9, name: "Don't Filter"};

  @Output() valueChanged = new EventEmitter(); 
  
  public typeParameterId: number;

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
    if (this.displaySearchOptions) {
      switch (this.selectedFilterOption.name) {
        case "True":
          return true;
        case "False":
          return false;
        case "Don't Filter":
          return undefined;
      }
    }
    else {
      return this.control.value;
    }
  }

  public ngOnInit(): void {
    this.control.setValue(this.control.value ?? false);
    this.control.valueChanges.subscribe(value => {
      this.valueChanged.emit(value)
      this.selectedFilterOption = value ? { filterMode: 7, name: "True" } : { filterMode: 8, name: "False" }
    });
  }
}

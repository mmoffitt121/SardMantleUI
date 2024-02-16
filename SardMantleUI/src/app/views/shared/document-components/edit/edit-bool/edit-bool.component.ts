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
  @Input() searchOptions = [
    "True",
    "False",
    "Don't Filter",
  ];
  @Input() public selectedSearchOption = "Don't Filter";

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
      switch (this.selectedSearchOption) {
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
    this.control.setValue(false);
    this.control.valueChanges.subscribe(value => {
      this.valueChanged.emit(value)
      this.selectedSearchOption = value ? "True" : "False"
    });
  }
}

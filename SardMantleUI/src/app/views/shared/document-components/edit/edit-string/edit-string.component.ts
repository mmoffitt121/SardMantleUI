import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrls: ['./edit-string.component.scss']
})
export class EditStringComponent implements OnInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() maxLength: number | undefined = undefined;
  @Input() thin = false;

  @Input() displayFilterOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 0, name: "Equals"},
    { filterMode: 1, name: "Contains"},
    { filterMode: 2, name: "Starts With"},
    { filterMode: 3, name: "Ends With"},
  ];
  @Input() public selectedFilterOption = { filterMode: 0, name: "Equals"};

  @Input() type: string = '';

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  public typeParameterId: number;

  public validate(e: any) {
    this.control.markAsTouched();
    if (this.maxLength !== undefined) {
      this.control.setValue(e.target.value.substring(0, this.maxLength))
    }
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
    return this.control.value;
  }

  ngOnInit() {
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }

    this.control.setValue(this.model);
    
    this.control.valueChanges.subscribe(value => {
      this.valueChanged.emit(value);
      this.modelChange.emit(value);
      this.model = value;
    })
  }
}

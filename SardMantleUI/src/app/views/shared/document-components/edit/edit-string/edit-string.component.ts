import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrls: ['./edit-string.component.scss']
})
export class EditStringComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() maxLength: number | null = null;

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

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
    if (this.maxLength != null) {
      this.control.addValidators([Validators.maxLength(this.maxLength)]);
    }
    
    this.control.valueChanges.subscribe(value => this.valueChanged.emit(value))
  }
}

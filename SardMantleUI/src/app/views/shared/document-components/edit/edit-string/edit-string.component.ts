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
  @Input() maxLength: number | null = null;
  @Input() thin = false;

  @Input() type: string = '';

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  public typeParameterId: number;

  public validate(e: any) {
    this.control.markAsTouched();
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
    if (this.maxLength != null) {
      this.control.addValidators([Validators.maxLength(this.maxLength)]);
    }

    this.control.setValue(this.model);
    
    this.control.valueChanges.subscribe(value => {
      this.valueChanged.emit(value);
      this.modelChange.emit(value);
      this.model = value;
    })
  }
}

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
    return this.control.value;
  }

  public ngOnInit(): void {
    this.control.valueChanges.subscribe(value => this.valueChanged.emit(value));
  }
}

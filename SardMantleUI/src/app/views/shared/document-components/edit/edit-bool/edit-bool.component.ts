import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-bool',
  templateUrl: './edit-bool.component.html',
  styleUrls: ['./edit-bool.component.scss']
})
export class EditBoolComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() control = new FormControl();
  @Input() default = false;
  @Input() required: boolean = false;

  @Output() valueChanged = new EventEmitter(); 

  public validate(e: any) {
    this.control.markAsTouched();
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public ngOnInit(): void {
    this.setValue(this.default);
    this.control.valueChanges.subscribe(value => this.valueChanged.emit(value));
  }
}

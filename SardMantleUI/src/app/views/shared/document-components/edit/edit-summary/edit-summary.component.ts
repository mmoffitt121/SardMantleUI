import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-summary',
  templateUrl: './edit-summary.component.html',
  styleUrls: ['./edit-summary.component.css']
})
export class EditSummaryComponent {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';

  @Output() valueChanged = new EventEmitter(); 

  public control = new FormControl();

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
    this.control.valueChanges.subscribe(value => this.valueChanged.emit(value))
  }
}

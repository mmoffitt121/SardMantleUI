import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrls: ['./edit-string.component.css']
})
export class EditStringComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
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

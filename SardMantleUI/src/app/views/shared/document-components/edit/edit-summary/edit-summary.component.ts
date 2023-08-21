import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-summary',
  templateUrl: './edit-summary.component.html',
  styleUrls: ['./edit-summary.component.scss']
})
export class EditSummaryComponent implements OnInit {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

  public typeParameterId: number;

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

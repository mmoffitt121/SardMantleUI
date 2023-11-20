import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-summary',
  templateUrl: './edit-summary.component.html',
  styleUrls: ['./edit-summary.component.scss']
})
export class EditSummaryComponent implements OnInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

  public typeParameterId: number;

  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  public setValue(value: any) {
    this.model = value;
    this.modelChange.emit(value);
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    return this.control.value;
  }

  ngOnInit() {
    this.control.setValue(this.model);
    this.control.valueChanges.subscribe(value => {
      this.valueChanged.emit(value);
      this.modelChange.emit(value);
    })
  }
}

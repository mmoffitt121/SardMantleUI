import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-range',
  templateUrl: './edit-range.component.html',
  styleUrls: ['./edit-range.component.scss']
})
export class EditRangeComponent implements OnInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() control = new FormControl();
  @Input() required: boolean = false;
  @Input() placeholder: string = "Number"
  @Input() canDelete = false;
  @Input() thin = false;
  public index: number;

  @Input() min = 0;
  @Input() max = 4;
  @Input() step = 1;

  @Output() valueChanged = new EventEmitter();
  @Output() delete = new EventEmitter();

  public typeParameterId: number;

  @Input() model: number;
  @Output() modelChange = new EventEmitter<number>();

  public validate(e: any) {
    
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
    return this.control.value !== undefined ? this.control.value + "" : undefined;
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.model = value;
      this.valueChanged.emit({value, index: this.index})
      this.modelChange.emit(this.model);
    });
    if (this.required) {
      this.control.addValidators([Validators.required]);
    }

    this.control.setValue(this.model);
  }
}

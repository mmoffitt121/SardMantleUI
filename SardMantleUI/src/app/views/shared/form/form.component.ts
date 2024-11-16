import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FormItem {
  name: string,
  description: string,
  value: string,
  intValue: number
  required: boolean,
  options: FormItemOption[],
  type: string | undefined,
  settings?: any
}

export interface FormItemOption {
  name: string,
  value: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() title: string;
  @Input() items: FormItem[];

  @Output() change = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  @Input() thin: boolean = false;

  public valid: boolean;

  public onChange() {
    let valid = true
    this.items.forEach(item => {
      if (Number(item.value)) {
        item.intValue = Number(item.value)
      }
      if (item.required && (!item.value || item.value == "")) {
        valid = false;
        return;
      }
    });

    this.valid = valid;

    if (valid) {
      this.change.emit(this.items);
      this.valueChange.emit(this.items);
    }
  }

  public Number(val: string) {
    return Number(val);
  }

  public BigInt(val: string) {
    return (val && val != 'undefined') ? BigInt(val) : undefined;
  }

  public setIntValue(item: FormItem, value: number) {
    item.value = String(value);
    this.onChange();
  }

  constructor() { }

  ngOnInit(): void {

  }
}

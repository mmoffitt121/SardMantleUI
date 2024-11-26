import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface FormItem {
  name: string,
  description: string,
  value: string,
  values?: string[],
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

  public save() {
    if (this.dialogRef) {
      this.dialogRef.close(this.items);
    }
  }

  public cancel() {
    this.dialogRef?.close();
  }

  constructor(@Optional() public dialogRef?: MatDialogRef<FormComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
    if (this.dialogRef && this.data && this.data.items) {
      this.title = this.data.title
      this.items = this.data.items
    }
  }
}

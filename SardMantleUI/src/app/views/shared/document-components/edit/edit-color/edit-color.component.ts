import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxMatColorPickerInput, Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.scss']
})
export class EditColorComponent {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() color: any;

  @Output() valueChanged = new EventEmitter(); 

  @Input() control = new FormControl();

  @Input() model: string;
  @Output() modelChange = new EventEmitter<string>();

  public typeParameterId: number;

  public validate(e: any) {
    this.control.markAsTouched();
  }

  public setValue(value: any) {
    this.control.setValue(this.parseColor(value));
    this.model = value;
    this.modelChange.emit(value);
  }

  public getValue() {
    return this.control.value;
  }

  parseColor(input: string) {
    try {
      if (input.substr(0,1)=="#") {
        var collen=(input.length-1)/3;
        var fact=[17,1,0.062272][collen-1];
        return new Color(
          Math.round(parseInt(input.substr(1,collen),16)*fact),
          Math.round(parseInt(input.substr(1+collen,collen),16)*fact),
          Math.round(parseInt(input.substr(1+2*collen,collen),16)*fact)
        );
      }
      else if (input.includes("rgb")) {
        let arr = input.split("(")[1].split(")")[0].split(",").map(x=>+x);
        return new Color(
          arr[0],
          arr[1],
          arr[2],
          arr[3]
        );
      }
      else {
        return undefined;
      }
    }
    catch {
      return;
    }
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      if (!value) return;
      this.model = "#" + value.hex;
      this.valueChanged.emit(this.model);
      this.modelChange.emit(this.model);
      if (value && !value.rgba) {
        this.control.setValue(this.parseColor(value))
      }
    });

    this.control.setValue(this.parseColor(this.model));
  }
}

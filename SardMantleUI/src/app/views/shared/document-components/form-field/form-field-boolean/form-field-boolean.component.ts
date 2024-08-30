import { Component, OnInit } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-field-boolean',
  templateUrl: './form-field-boolean.component.html',
  styleUrls: ['./form-field-boolean.component.scss']
})
export class FormFieldBooleanComponent extends FormFieldBasicComponent implements OnInit {
  public override registerFilterOptions() {
    this.filterOptions = [
      { filterMode: 7, name: "True"},
      { filterMode: 8, name: "False"},
      { filterMode: 0, name: "Don't Filter"},
    ]
    this.setFilterOption(this.filterOptions[2]);
  }
  
  public override setFilterOption(opt: any) {
    super.setFilterOption(opt);

    switch (opt.name) {
      case "True":
        this.control.setValue(true);
        break;
      case "False":
        this.control.setValue(false);
        break;
      case "Don't Filter":
        this.control.setValue(undefined);
        break;
    }
  }

  public override validate($event: any) {
    if ($event === true || $event === false) {
      return super.validate($event);
    }
    return true;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.control.setValue(this.parameter.value)
    this.control.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(valueChange => {
      if (this.validate(valueChange)) {
        if (valueChange == undefined) {
          this.selectedFilterOption = this.filterOptions[2];
        } else if (valueChange) {
          this.selectedFilterOption = this.filterOptions[0];
        } else {
          this.selectedFilterOption = this.filterOptions[1];
        }
      }
    })
  }
}

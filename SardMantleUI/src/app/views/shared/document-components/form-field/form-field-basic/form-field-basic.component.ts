import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';
import { DestroyableComponent } from '../../../util/destroyable/destroyable.component';
import { ParameterSearchOptions } from 'src/app/models/pages/view';

@Component({
  selector: 'app-form-field-basic',
  templateUrl: './form-field-basic.component.html',
  styleUrls: ['./form-field-basic.component.scss']
})
export class FormFieldBasicComponent extends DestroyableComponent implements OnInit {
  @Input() parameter: QueriedDataPointParameter;
  @Input() queryOptions: ParameterSearchOptions | undefined;
  @Input() placeholder: string = ""
  control: FormControl;
  previousValue: string = "";

  @Input() smallLabel = false

  @Input() showTitle = true;
  @Input() showSubtitle = true;

  @Input() displayFilterOptions: boolean = false;
  @Input() filterOptions = [
    { filterMode: 0, name: "Equals"},
  ];
  @Input() public selectedFilterOption = { filterMode: 0, name: "Equals"};

  // Array of callables that return type boolean
  public filters: any[] = [];

  public validate(value: any): boolean {
    this.control.markAsTouched();
    let valid = true;
    this.filters.forEach(x => {
      if (!x(value)) {
        valid = false;
      }
    })
    return valid;
  }

  public setFilterOption(opt: any) {
    this.selectedFilterOption = opt;
    if (this.queryOptions) {
      this.queryOptions.filterMode = opt.filterMode;
    }
  }

  public registerFilterOptions() {
    switch (this.parameter.typeParameterTypeValue) {
      case 'str':
      case 'sum':
        this.filterOptions = [
          { filterMode: 0, name: "Equals"},
          { filterMode: 1, name: "Contains"},
          { filterMode: 2, name: "Starts With"},
          { filterMode: 3, name: "Ends With"},
        ];
        break;
      case 'int':
      case 'dub':
        this.filterOptions = [
          { filterMode: 0, name: "Equals"},
          { filterMode: 6, name: "Less Than"},
          { filterMode: 5, name: "Greater Than"},
        ];
        break;
      default:
        break;
    }
  }

  public registerValidationFilters() {
    switch (this.parameter.typeParameterTypeValue) {
      case 'str':
        this.filters.push((value: any) => {return value?.length <= 1000});
        break;
      case 'sum':
        this.filters.push((value: any) => {return value?.length <= 65535});
        break;
      case 'int':
        this.filters.push((value: any) => {
          return !isNaN(+value) && BigInt(value) <= 18446744073709551615n
        });
        break;
      case 'dub':
        this.filters.push((value: any) => {
          return !isNaN(+value)
        });
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.control = new FormControl(this.parameter.value, []);
    this.registerValidationFilters();
    this.registerFilterOptions();
    this.control.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(valueChange => {
      if (this.validate(valueChange)) {
        this.previousValue = valueChange;
        this.parameter.value = valueChange;
      } else {
        this.control.setValue(this.previousValue);
      }
    })
  }
}

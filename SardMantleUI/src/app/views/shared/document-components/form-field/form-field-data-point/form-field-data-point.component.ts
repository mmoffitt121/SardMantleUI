import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { DataPointSearchCriteria } from 'src/app/models/pages/view';
import { take } from 'rxjs';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-data-point',
  templateUrl: './form-field-data-point.component.html',
  styleUrls: ['./form-field-data-point.component.scss']
})
export class FormFieldDataPointComponent extends FormFieldBasicComponent implements OnChanges {
  @Input() clearable = false;
  @Input() autoQuery = false;
  @Input() items: QueriedDataPoint[];
  
  selectedItem: QueriedDataPoint | undefined;
  displayControl = new FormControl();
  clearOnInput = false;

  public clear() {
    this.control.setValue(undefined);
    this.displayControl.setValue("");
  }

  public input(event: any) {
    if (this.clearOnInput) {
      this.displayControl.setValue(event.data);
      this.clearOnInput = false;
    }
    this.loadOptions();
  }

  public focus() {
    this.clearOnInput = true;
  }

  public onUnfocus() {
    if (this.items.length > 0 && this.items[0].name?.toLocaleLowerCase() == this.displayControl.value?.toLocaleLowerCase()) {
      this.setValue(this.items[0]);
    } else if (this.selectedItem) {
      this.displayControl.setValue(this.selectedItem.name);
    } else {

    }
  }

  public select(event: any) {
    this.setValue(event.option.value)
  }

  public setValue(value: QueriedDataPoint) {
    this.selectedItem = value;
    this.control.setValue(value.id)
    this.displayControl.setValue(value.name)
  }

  public loadOptions() {
    let criteria = {
      pageSize: 100,
      pageNumber: 1,
      query: this.displayControl?.value ?? "",
      typeId: this.parameter.dataPointTypeReferenceId ?? -1,
      includeTypes: false,
      includeChildDataPoints: false,
      includeParameters: false
    } as DataPointSearchCriteria;

    this.qService.query(criteria).pipe(take(1)).subscribe(result => {
      this.items = result.results;
    });
  }

  constructor(private qService: ViewQueryService) {
    super();
  }

  public override ngOnChanges(changes: SimpleChanges): void {

    if (changes['parameter']) {
      this.selectedItem = this.parameter.valueData;
      this.displayControl.setValue(this.selectedItem?.name)
      this.loadOptions();
    }
  }
}

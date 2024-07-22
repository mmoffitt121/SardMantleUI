import { Component, Input } from '@angular/core';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';
import { ParameterSearchOptions } from 'src/app/models/pages/view';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() parameter: QueriedDataPointParameter;
  @Input() queryOptions: ParameterSearchOptions | undefined;
  @Input() showFilterOptions: boolean = false;

  @Input() compact: boolean = false;
  @Input() showTitle: boolean = true;
  @Input() showSubtitle: boolean = false;

}

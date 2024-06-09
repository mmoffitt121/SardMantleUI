import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { ParameterSearchOptions } from 'src/app/models/pages/view';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent {
  @Input() showSubmit: boolean = false;
  @Input() submitText: string = "Save";

  @Input() compact: boolean = false;

  @Input() showFilterOptions: boolean = false;

  @Input() document: QueriedDataPoint;
  @Input() queryOptions: ParameterSearchOptions[];

  @Output() submit = new EventEmitter();
}

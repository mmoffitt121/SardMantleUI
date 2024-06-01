import { Component, Input } from '@angular/core';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';

@Component({
  selector: 'app-presentation-param-base',
  templateUrl: './presentation-param-base.component.html',
  styleUrls: ['./presentation-param-base.component.scss']
})
export class PresentationParamBaseComponent {
  @Input() parameter: QueriedDataPointParameter;
}

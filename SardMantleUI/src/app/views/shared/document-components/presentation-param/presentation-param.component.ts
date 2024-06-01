import { Component, Input } from '@angular/core';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';

@Component({
  selector: 'app-presentation-param',
  templateUrl: './presentation-param.component.html',
  styleUrls: ['./presentation-param.component.scss']
})
export class PresentationParamComponent {
  @Input() parameter: QueriedDataPointParameter;
}

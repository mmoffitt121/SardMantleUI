import { Component, Input } from '@angular/core';
import { QueriedDataPointParameter } from 'src/app/models/document/document-query-result';

@Component({
  selector: 'app-presentation-params-container',
  templateUrl: './presentation-params-container.component.html',
  styleUrls: ['./presentation-params-container.component.scss']
})
export class PresentationParamsContainerComponent {
  @Input() parameters: QueriedDataPointParameter[]
}

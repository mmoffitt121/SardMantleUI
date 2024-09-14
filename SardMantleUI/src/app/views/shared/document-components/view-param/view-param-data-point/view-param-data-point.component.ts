import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewDataPointComponent } from '../../view/view-data-point/view-data-point.component';
import { DocumentPopupComponent } from '../../document-popup/document-popup.component';
import { PresentationParamDataPointComponent } from '../../presentation-param/presentation-param-data-point/presentation-param-data-point.component';

@Component({
  selector: 'app-view-param-data-point',
  templateUrl: './view-param-data-point.component.html',
  styleUrls: ['./view-param-data-point.component.scss']
})
export class ViewParamDataPointComponent extends PresentationParamDataPointComponent {
  @Input() value: number;

  public popupDocument() {
    const ref = this.dialog.open(DocumentPopupComponent,  {
      width: 'min(100vw, 750px)',
      height: 'min(100vh, 900px)',
      data: { 
        id: this.parameter.valueData.id
      }
    })
  }
}

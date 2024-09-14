import { Component, Input } from '@angular/core';
import { ViewStringComponent } from '../../view/view-string/view-string.component';
import { PresentationParamBaseComponent } from '../../presentation-param/presentation-param-base/presentation-param-base.component';

@Component({
  selector: 'app-view-param-string',
  templateUrl: './view-param-string.component.html',
  styleUrls: ['./view-param-string.component.scss']
})
export class ViewParamStringComponent extends PresentationParamBaseComponent {
  
}

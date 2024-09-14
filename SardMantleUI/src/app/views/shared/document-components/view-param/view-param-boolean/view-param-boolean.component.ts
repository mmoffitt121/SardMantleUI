import { Component } from '@angular/core';
import { ViewBoolComponent } from '../../view/view-bool/view-bool.component';
import { PresentationParamBooleanComponent } from '../../presentation-param/presentation-param-boolean/presentation-param-boolean.component';

@Component({
  selector: 'app-view-param-boolean',
  templateUrl: './view-param-boolean.component.html',
  styleUrls: ['./view-param-boolean.component.scss']
})
export class ViewParamBooleanComponent extends PresentationParamBooleanComponent {

}

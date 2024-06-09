import { Component } from '@angular/core';
import { ViewDoubleComponent } from '../../view/view-double/view-double.component';
import { PresentationParamUnitComponent } from '../../presentation-param/presentation-param-unit/presentation-param-unit.component';

@Component({
  selector: 'app-view-param-unit',
  templateUrl: './view-param-unit.component.html',
  styleUrls: ['./view-param-unit.component.scss']
})
export class ViewParamUnitComponent extends PresentationParamUnitComponent {

}

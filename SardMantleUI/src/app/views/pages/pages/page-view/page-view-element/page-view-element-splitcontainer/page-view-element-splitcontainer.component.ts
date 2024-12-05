import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';
import { PageViewElementBaseComponent } from '../page-view-element-base/page-view-element-base.component';

@Component({
  selector: 'app-page-view-element-splitcontainer',
  templateUrl: './page-view-element-splitcontainer.component.html',
  styleUrls: ['./page-view-element-splitcontainer.component.scss']
})
export class PageViewElementSplitcontainerComponent extends PageViewElementBaseComponent implements OnChanges {
  public getSize(index: number) {
    if (index) {
      switch (this.settingsObject.Split) {
        case 'Left Focus':
          return '67%';
        case 'Right Focus':
          return '33%';
        case 'Half and Half':
        default:
          return '50%';
      }
    } else {
      switch (this.settingsObject.Split) {
        case 'Left Focus':
          return '33%';
        case 'Right Focus':
          return '67%';
        case 'Half and Half':
        default:
          return '50%';
      }
    }
  }
}

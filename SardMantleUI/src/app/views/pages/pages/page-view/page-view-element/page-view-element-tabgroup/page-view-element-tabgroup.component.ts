import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';
import { PageViewElementBaseComponent } from '../page-view-element-base/page-view-element-base.component';

@Component({
  selector: 'app-page-view-element-tabgroup',
  templateUrl: './page-view-element-tabgroup.component.html',
  styleUrls: ['./page-view-element-tabgroup.component.scss']
})
export class PageViewElementTabgroupComponent extends PageViewElementBaseComponent implements OnChanges {

}

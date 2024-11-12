import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';
import { PageViewElementBaseComponent } from '../page-view-element-base/page-view-element-base.component';

@Component({
  selector: 'app-page-view-element-document',
  templateUrl: './page-view-element-document.component.html',
  styleUrls: ['./page-view-element-document.component.scss']
})
export class PageViewElementDocumentComponent extends PageViewElementBaseComponent implements OnChanges {

}

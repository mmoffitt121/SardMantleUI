import { Component, Input, SimpleChange } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';
import { PageViewElementBaseComponent } from '../page-view-element-base/page-view-element-base.component';

@Component({
  selector: 'app-page-view-element-directory',
  templateUrl: './page-view-element-directory.component.html',
  styleUrls: ['./page-view-element-directory.component.scss']
})
export class PageViewElementDirectoryComponent extends PageViewElementBaseComponent {
  public selectedItem: PageElement | undefined;

  public select(elem: PageElement | undefined) {
    this.selectedItem = elem;
  }
}

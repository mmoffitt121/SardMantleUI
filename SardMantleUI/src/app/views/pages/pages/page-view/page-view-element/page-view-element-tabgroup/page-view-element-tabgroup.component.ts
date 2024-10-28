import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-page-view-element-tabgroup',
  templateUrl: './page-view-element-tabgroup.component.html',
  styleUrls: ['./page-view-element-tabgroup.component.scss']
})
export class PageViewElementTabgroupComponent extends DestroyableComponent implements OnChanges {
  @Input() element?: PageElement;
  @Input() settings?: string;
  @Input() editing = false;
  public settingsObject: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']?.currentValue) {
      this.settingsObject = JSON.parse(changes['settings']?.currentValue);
    }
  }
}

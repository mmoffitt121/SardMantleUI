import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';

@Component({
  selector: 'app-page-view-element-base',
  templateUrl: './page-view-element-base.component.html',
  styleUrls: ['./page-view-element-base.component.scss']
})
export class PageViewElementBaseComponent {
  @Input() element?: PageElement;
  @Input() settings?: string;
  @Input() editing = false;
  public settingsObject: any;
  @Input() passthroughSettings: any | undefined;

  public getElementName(element: PageElement): string {
    const obj = JSON.parse(element.objectSettings ?? '{}');
    return (obj['Element Name'] ?? "Element");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']?.currentValue) {
      this.settingsObject = JSON.parse(changes['settings']?.currentValue);
    }
  }
}

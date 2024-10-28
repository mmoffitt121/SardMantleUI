import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageElement } from 'src/app/models/pages/page';

@Component({
  selector: 'app-page-view-element',
  templateUrl: './page-view-element.component.html',
  styleUrls: ['./page-view-element.component.scss']
})
export class PageViewElementComponent implements OnChanges {
  @Input() element: PageElement | undefined;
  @Input() editing = false;
  public settings: any;
  public selected = false;

  public edit() {

  }

  public editSettings() {

  }

  public delete() {
    
  }

  public select() {
    this.selected = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['element']) {
      this.settings = JSON.parse(this.element?.objectSettings)
    }
  }
}

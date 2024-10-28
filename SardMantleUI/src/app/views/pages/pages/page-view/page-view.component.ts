import { Component, Input } from '@angular/core';
import { Page } from 'src/app/models/pages/page';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent {
  @Input() page: Page | undefined;
  @Input() editing = false;
}

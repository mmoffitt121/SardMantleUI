import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { View } from 'src/app/models/pages/view';
import { ViewService } from 'src/app/services/pages/view.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnChanges {
  @Input() view?: View;
  @Input() settings?: any;
  @Input() editing = false;
  public settingsObject: any;

  @Input() displayMenuButton = false;

  public edit() {
    this.urlService.navigate(['views']);
  }

  public editSettings() {

  }

  public delete() {
    
  }

  constructor(private viewService: ViewService, private urlService: UrlService) {

  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']?.currentValue) {
      this.settingsObject = JSON.parse(changes['settings']?.currentValue);
      const viewId = this.settingsObject.View;
      if (viewId) {
        this.viewService.get({ids: [viewId]}).pipe(take(1)).subscribe(result => {
          if (result.length > 0) {
            this.view = result[0];
          } else {
            this.view = undefined;
          }
        });
      } else {
        this.view = undefined;
      }
    }
  }
}

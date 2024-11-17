import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { Page, PageCriteria } from 'src/app/models/pages/page';
import { PageService } from 'src/app/services/pages/page.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {
  @Input() page: Page | undefined;
  @Input() editing = false;

  public topbarStyle = "height: 50px; max-height: 65px;";
  public elementStyle = "top: 65px;";

  public showTopbar(show: any) {
    if (show) {
      this.topbarStyle = "height: 50px; max-height: 65px;";
      this.elementStyle = "top: 65px;";
    } else {
      this.topbarStyle = "display: none;";
      this.elementStyle = "top: 0px;";
    }
    this.cdref.detectChanges();
  }

  constructor(private route: ActivatedRoute, private pageService: PageService, private cdref: ChangeDetectorRef) {

  } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['path'] != undefined) {
        this.pageService.get({path: params['path']} as PageCriteria).pipe(take(1)).subscribe(result => {
          if (result[0]) {
            this.page = result[0];
          }
        })
      }
    })
  }
}

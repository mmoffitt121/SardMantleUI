import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, takeUntil } from 'rxjs';
import { Page, PageCriteria } from 'src/app/models/pages/page';
import { ErrorService } from 'src/app/services/error.service';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';
import { PageService } from 'src/app/services/pages/page.service';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';
import { PaginatableComponent } from 'src/app/views/shared/util/paginatable/paginatable.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent extends DestroyableComponent implements OnInit {
  public pages: Page[];
  @Output() select = new EventEmitter();

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 50;
  public pageSizeOptions: [4, 7, 9];

  public onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadPages();
  }

  private loadPages() {
    this.pageService.get({pageSize: this.pageSize, pageNumber: this.pageIndex+1, includePageData: false} as PageCriteria).pipe(take(1)).subscribe(result => {
      this.pages = result;
    }, error => {
      this.errorService.handle(error)
    })
    this.pageService.getCount({pageSize: this.pageSize, pageNumber: this.pageIndex+1, includePageData: false} as PageCriteria).pipe(take(1)).subscribe(result => {
      this.pageLength = result;
    }, error => {
      this.errorService.handle(error)
    })
  }

  public onSelect(page: Page) {
    this.select.emit(page.id);
  }

  constructor(
    private pageService: PageService,
    private errorService: ErrorService,
    private service: PageEditorService
  ) { super(); }

  public ngOnInit(): void {
    this.pageSize = 25;
    this.loadPages();

    this.service.saved.pipe(takeUntil(this.destroyed$)).subscribe(saved => this.loadPages());
  }
}

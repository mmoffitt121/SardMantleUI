import { Component } from '@angular/core';

@Component({
  selector: 'app-paginatable',
  templateUrl: './paginatable.component.html',
  styleUrls: ['./paginatable.component.scss']
})
export class PaginatableComponent {
  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 50;
  public pageSizeOptions: [4, 7, 9];

  public onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}

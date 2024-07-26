import { Component } from '@angular/core';
import { PaginatableComponent } from '../../shared/util/paginatable/paginatable.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent extends PaginatableComponent {
  public search(event: any) {
    console.log(event)
  }

  public getPageCriteria() {
    /*return {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      query: this.searchBar?.getValue() ?? ''
    }*/
  }
}

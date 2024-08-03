import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaginatableComponent } from '../../shared/util/paginatable/paginatable.component';
import { ImageService } from 'src/app/services/image/image.service';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent extends PaginatableComponent implements OnInit {
  public images: Image[];
  public baseUrl = environment.baseUrl;
  public query = "";
  @Output() select = new EventEmitter();
  public search(query: any) {
    this.query = query;
    let criteria = {pageNumber: this.pageIndex, pageSize: this.pageSize, query};
    this.imageService.getImages(criteria).pipe(take(1)).subscribe(result => {
      this.images = result;
    });
    this.imageService.getImageCount(criteria).pipe(take(1)).subscribe(result => {
      this.pageLength = result;
    });
  }

  public navigate() {
    this.search(this.query);
  }

  public onClick(image: Image) {
    this.select.emit(image)
  }

  public getPageCriteria() {
    /*return {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      query: this.searchBar?.getValue() ?? ''
    }*/
  }

  constructor(private imageService: ImageService) {
    super();
  }

  public ngOnInit(): void {
    this.pageIndex = 0;
    this.pageSize = 25;
    this.search("")
  }
}

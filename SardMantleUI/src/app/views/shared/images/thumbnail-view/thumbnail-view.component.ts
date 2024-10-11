import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ImageService } from 'src/app/services/image/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss']
})
export class ThumbnailViewComponent implements OnInit, OnChanges {
  @Input() image: Image | undefined;
  @Input() id: string | undefined;
  public imageToShow: any;
  public loading: boolean = true;
  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    this.loading = false;
    this.imageToShow = environment.baseUrl + '/Library/Image/Thumbnail'
      + "?id=" + (this.image ? this.image.id : this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['image'] || changes['id']) {
      this.ngOnInit();
    }
  }
}
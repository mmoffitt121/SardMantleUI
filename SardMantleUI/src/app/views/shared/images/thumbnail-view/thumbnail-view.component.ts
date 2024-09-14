import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ImageService } from 'src/app/services/image/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thumbnail-view',
  templateUrl: './thumbnail-view.component.html',
  styleUrls: ['./thumbnail-view.component.scss']
})
export class ThumbnailViewComponent implements OnInit {
  @Input() image: Image;
  public imageToShow: any;
  public loading: boolean = true;
  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    this.loading = false;
    this.imageToShow = environment.baseUrl + '/Library/Image/Thumbnail'
      + "?id=" + this.image.id;
  }
}
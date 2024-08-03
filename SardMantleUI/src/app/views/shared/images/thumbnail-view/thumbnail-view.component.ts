import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ImageService } from 'src/app/services/image/image.service';

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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.thumbnail(this.image.id).pipe(take(1)).subscribe((image: any) => {
      this.createImageFromBlob(image as Blob);
      this.loading = false;
    })
  }
}
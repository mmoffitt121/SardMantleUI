import { Component } from '@angular/core';
import { PresentationParamBaseComponent } from '../presentation-param-base/presentation-param-base.component';
import { ImageViewerComponent } from 'src/app/views/storage/image-viewer/image-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { Image } from 'src/app/models/content/image';

@Component({
  selector: 'app-presentation-param-image',
  templateUrl: './presentation-param-image.component.html',
  styleUrls: ['./presentation-param-image.component.scss']
})
export class PresentationParamImageComponent extends PresentationParamBaseComponent {
  private images = new Map<string, Image>();

  public onClick(id: string) {
    if (this.images.get(id)) {
      this.selectImage(this.images.get(id));
    } else {
      this.imageService.getImages({stringId: id}).pipe(take(1)).subscribe(images => {
        if (images[0]) {
          this.images.set(id, images[0]);
          this.selectImage(this.images.get(id));
        }
      })
    }
  }

  public selectImage(image?: Image) {
    let dialogRef = this.dialog.open(ImageViewerComponent, {
      data: { 
        image
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      
    });
  }

  constructor(private dialog: MatDialog, private imageService: ImageService) {super();}
}

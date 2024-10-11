import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { Image } from 'src/app/models/content/image';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { WorldService } from 'src/app/services/world/world.service';
import { ImageViewerComponent } from '../storage/image-viewer/image-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ImagePickerComponent } from '../storage/image-picker/image-picker.component';
import { SelectUserComponent } from '../shared/edit/select-user/select-user.component';

@Component({
  selector: 'app-world-setup',
  templateUrl: './world-setup.component.html',
  styleUrls: ['./world-setup.component.scss']
})
export class WorldSetupComponent implements OnInit {
  public worldName = new FormControl();
  public worldDescription = new FormControl();
  public worldIcon: Image;
  public worldOwnerId: string;
  public worldOwnerName: string;

  private world: any;

  public selectIcon() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      width: 'min(100vw, 700px)',
      height: 'min(100vh, 700px)',
      data: { title: "Upload File" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.worldIcon = {
          id: result,
          name: "World Icon",
          description: "",
          size: 0,
          creationDate: undefined,
          extension: "",
        }
      }
    });
  }

  public selectOwner() {
    const dialogRef = this.dialog.open(SelectUserComponent, {
      width: '500px',
      height: '600px',
      data: { 
        title: "Add User", 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.worldOwnerId = result.id;
        this.worldOwnerName = result.userName;
      }
    });
  }

  public save() {
    this.worldService.putWorld({
      ...this.world,
      name: this.worldName.value,
      summary: this.worldDescription.value,
      iconId: this.worldIcon.id,
      ownerId: this.worldOwnerId
    }).pipe(take(1)).subscribe(result => {
      this.errorService.showSnackBar("World " + this.worldName.value + " successfully saved.");
    }, error => {
      this.errorService.handle(error);
    });
  }

  constructor (private urlService: UrlService, private worldService: WorldService, private errorService: ErrorService, private dialog: MatDialog) {
    
  }

  public ngOnInit(): void {
    this.worldService.getWorld(this.urlService.getWorld()).pipe(take(1)).subscribe(result => {
      this.world = result;
      this.worldName.setValue(this.world.name);
      this.worldDescription.setValue(this.world.summary);
      this.worldOwnerId = this.world.ownerId;
      this.worldOwnerName = this.world.ownerName;

      this.worldIcon = {
        id: this.world.iconId,
        name: "World Icon",
        description: "",
        size: 0,
        creationDate: undefined,
        extension: "",
      }
    })
  }
}

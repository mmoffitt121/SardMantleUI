import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { ErrorService } from 'src/app/services/error.service';
import { WorldService } from 'src/app/services/world/world.service';

@Component({
  selector: 'app-world-creator',
  templateUrl: './world-creator.component.html',
  styleUrls: ['./world-creator.component.scss']
})
export class WorldCreatorComponent {
  public loading = false;
  public name = new FormControl();
  public location = new FormControl();
  public summary = new FormControl();

  public onSave() {
    let world = {
      name: this.name.value, 
      location: this.location.value, 
      summary: this.summary.value,
      ownerId: localStorage.getItem("userId")
    } as World;
    this.worldService.postWorld(world).subscribe(response => {
      this.worldService.getWorlds({id: response}).subscribe(resp => {
        if (resp && resp[0]) {
          this.dialogRef.close(resp[0]);
          this.router.navigate([resp[0].location]);
        }
        else {
          this.errorService.showSnackBar("Unable to locate world after creation.");
          this.router.navigate(["home"]);
        }
      },
      error => {
        this.errorService.handle(error);
      })
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

  constructor(
    public dialogRef: MatDialogRef<WorldCreatorComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private worldService: WorldService,
    private errorService: ErrorService,
    private router: Router
  ) { }
}

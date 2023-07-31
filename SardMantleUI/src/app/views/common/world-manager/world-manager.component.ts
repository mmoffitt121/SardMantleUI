import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { WorldCreatorComponent } from './world-creator/world-creator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-world-manager',
  templateUrl: './world-manager.component.html',
  styleUrls: ['./world-manager.component.scss']
})
export class WorldManagerComponent {
  public userId: string;

  public selectWorld(world: World) {

  }

  public openCreateMenu() {
    const dialogRef = this.dialog.open(WorldCreatorComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([result.location]);
      }
    });
  }

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private dialog: MatDialog) { 
    this.userId = localStorage["userId"];
  }

  ngOnInit(): void {
  }
}

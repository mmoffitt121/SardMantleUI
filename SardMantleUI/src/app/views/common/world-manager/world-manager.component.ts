import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { WorldCreatorComponent } from './world-creator/world-creator.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentService } from 'src/app/services/document/document.service';
import { FormControl } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-world-manager',
  templateUrl: './world-manager.component.html',
  styleUrls: ['./world-manager.component.scss']
})
export class WorldManagerComponent {
  public userId: string;
  public selectedWorld: World;
  public selectedDataPoint: Document;
  public featured: Document[] = [];
  public addingDataPoint = false;

  public selectWorld(world: World) {
    this.addingDataPoint = false;
    this.selectedWorld = world;
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

  public addDataPoint() {
    this.addingDataPoint = true;
  }

  public selectDataPoint(event: any) {
    this.selectedDataPoint = event;
  }

  public handleAddDataPoint() {
    this.featured.push(this.selectedDataPoint);
    this.addingDataPoint = false;
  }

  public handleCancelDataPoint() {
    this.addingDataPoint = false;
  }

  public deleteFeatured(f: Document) {
    this.featured.splice(this.featured.indexOf(f), 1);
  }

  public visitWorld() {
    this.router.navigate([this.selectedWorld.location, "home"]);
  }

  public dropDataPoint(event: any) {
    moveItemInArray(this.featured, event.previousIndex, event.currentIndex);

    for (let i = 0; i < this.featured.length; i++) {
      this.featured[i].id = i;
    }
  }

  public saveFeatured() {
    let featured: any[] = [];
    let i = 0;
    this.featured.forEach(f => {
      featured.push({id: i, dataPointId: f.id});
      i++;
    })
    this.documentService.updateFeatured(featured, this.selectedWorld.location).subscribe(result => {
      this.errorService.showSnackBar("Home Screen updated successfully.");
    },
    error => {
      this.errorService.handle(error);
    })
  }

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private dialog: MatDialog, private themeService: ThemeService, private documentService: DocumentService, private errorService: ErrorService) { 
    this.userId = localStorage["userId"];
  }

  ngOnInit(): void {
  }
}

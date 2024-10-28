import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Page, PageCriteria } from 'src/app/models/pages/page';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { FormDialogComponent } from '../../shared/form-dialog/form-dialog.component';
import { PageService } from 'src/app/services/pages/page.service';
import { ErrorService } from 'src/app/services/error.service';
import { BehaviorSubject, take } from 'rxjs';
import { DestroyableComponent } from '../../shared/util/destroyable/destroyable.component';
import { PageEditorService } from 'src/app/services/pages/page-editor.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent extends DestroyableComponent {
  public SELECT_PAGE = "Select Page";
  public LAYOUT = "Layout";
  public VIEWS = "Views";
  public APPEARANCE = "Appearance";
  public SETTINGS = "Settings";

  public preview = true;

  public page: Page | undefined

  public pageMode = new BehaviorSubject("");
  public sidebarOpened = new BehaviorSubject(false);

  public add() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { 
        title: "Add View", 
        items: [{
          name: "Name",
          value: "",
          required: true,
        },
        {
          name: "Description",
          value: "",
          required: true,
        },
        {
          name: "Path",
          value: "",
          required: true,
        }]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let page = {
          id: undefined,
          name: result[0].value,
          description: result[1].value,
          path: result[2].value,
        }
        this.pageService.put(page).subscribe(result => {
          this.errorService.showSnackBar("Page succesfully created.");
        }, error => this.errorService.handle(error))
      }
    });
  }

  public loadPage(id: string) {
    this.pageService.get({ids: [id]} as PageCriteria).pipe(take(1)).subscribe(result => {
      this.page = result[0];
    });
  }

  public toggleSidePanel(option: string) {
    if (option === this.pageMode.value && this.sidebarOpened.value) {
      this.sidebarOpened.next(false);
      return;
    }

    this.pageMode.next(option);
    this.sidebarOpened.next(true);
  }

  public togglePreview() {
    this.preview = !this.preview
  }

  public save() {
    this.pageService.put(this.page).subscribe(result => {
      this.errorService.showSnackBar("Page succesfully saved.");
    }, error => this.errorService.handle(error))
  }

  constructor (
    public skeletonService: SkeletonService, 
    private dialog: MatDialog,
    private pageService: PageService,
    private errorService: ErrorService,
    private pageEditorService: PageEditorService,
  ) { super(); }
}

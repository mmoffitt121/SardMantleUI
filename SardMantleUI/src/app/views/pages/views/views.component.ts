import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDialogComponent } from '../../shared/form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewService } from 'src/app/services/pages/view.service';
import { ErrorService } from 'src/app/services/error.service';
import { View } from 'src/app/models/pages/view';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ViewEditorService } from 'src/app/services/pages/view-editor.service';
import { PaginatableComponent } from '../../shared/util/paginatable/paginatable.component';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent extends PaginatableComponent implements OnInit {
  public views: View[] = [];

  public selectedView: View | undefined;
  public changes = false;

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
        }]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let view = {
          id: undefined,
          name: result[0].value,
          description: result[1].value,
          viewType: "List",
          searchCriteriaOptions: undefined,
          settings: this.editorService.getViewDefaults("List"),
        }
        this.viewService.put(view).subscribe(result => {
          this.errorService.showSnackBar("View succesfully created.");
          this.loadViews();
        }, error => this.errorService.handle(error))
      }
    });
  }

  public onEditorClose() {
    if (this.changes) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '480px',
        data: { title: 'Unsaved Changes', content: 'Are you sure you discard your changes?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedView = undefined;
          this.changes = false;
        }
      });
    } else {
      this.selectedView = undefined;
      this.changes = false;
    }
  }

  public onEditorDelete(view: View) {
    this.viewService.delete(view.id ?? "").subscribe(result => {
      this.changes = false;
      this.onEditorClose();
      this.loadViews();
    }, error => this.errorService.handle(error));
  }

  public onEditorSave(view: View) {
    this.viewService.put(view).subscribe(result => {
      this.changes = false;
      this.onEditorClose();
      this.loadViews();
    }, error => {
      this.errorService.handle(error);
    }) 
  }

  public select(view: View) {
    if (this.changes) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '480px',
        data: { title: 'Unsaved Changes', content: 'Are you sure you discard your changes?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedView = {...view};
          this.changes = false;
        }
      });
    }
    else {
      this.selectedView = {...view};
    }
    
  }

  public loadViews() {
    this.viewService.getCount({}).subscribe((result: any) => {this.pageLength = result;})
    this.viewService.get({pageNumber: this.pageIndex+1, pageSize: this.pageSize, orderBy: "Name"}).subscribe((result: any) => {this.views = result;})
  }

  public override onPageChange(event: any): void {
    super.onPageChange(event);
    this.loadViews();
  }

  constructor(private dialog: MatDialog, private viewService: ViewService, private errorService: ErrorService, private editorService: ViewEditorService) { super(); }

  ngOnInit(): void {
    this.pageSize = 50;
    this.loadViews();
  }
}

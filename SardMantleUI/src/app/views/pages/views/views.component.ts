import { Component, OnInit } from '@angular/core';
import { FormDialogComponent } from '../../shared/form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewService } from 'src/app/services/pages/view.service';
import { ErrorService } from 'src/app/services/error.service';
import { View } from 'src/app/models/pages/view';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {
  public views: View[] = [];

  public selectedView: View | undefined;

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
          searchCriteriaOptions: undefined
        }
        this.viewService.put(view).subscribe(result => {
          this.errorService.showSnackBar("View succesfully created.");
          this.loadViews();
        }, error => this.errorService.handle(error))
      }
    });
  }

  public onEditorClose() {
    this.selectedView = undefined;
  }

  public onEditorSave(view: View) {
    this.viewService.put(view).subscribe(result => {
      this.onEditorClose();
    }, error => {
      this.errorService.handle(error);
    }) 
  }

  public select(view: View) {
    this.selectedView = view;
  }

  public loadViews() {
    this.viewService.get({}).subscribe((result: any) => {this.views = result})
  }

  constructor(private dialog: MatDialog, private viewService: ViewService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.loadViews();
  }
}

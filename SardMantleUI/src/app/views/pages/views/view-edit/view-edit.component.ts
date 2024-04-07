import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, ReplaySubject, takeUntil } from 'rxjs';
import { View, ViewTypes } from 'src/app/models/pages/view';
import { DocumentFilterComponent } from 'src/app/views/document/document-filter/document-filter.component';
import { DocumentTypeComponent } from 'src/app/views/document/document-type/document-type.component';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from 'src/app/views/shared/form-dialog/form-dialog.component';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent implements OnDestroy, OnInit, OnChanges {
  @Input() view: View;

  @Output() close = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter();
  private changes = new BehaviorSubject(false);
  public changes$ = this.changes.asObservable();
  @Output() change = new EventEmitter();

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public viewTypes = ViewTypes;

  public editDetails() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px',
      data: { 
        title: "Details", 
        items: [{
          name: "Name",
          value: this.view.name,
          required: true,
        },
        {
          name: "Description",
          value: this.view.description,
          required: true,
        }]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.view.name = result[0].value;
        this.view.description = result[1].value;
        this.changes.next(true);
      }
    });
  }

  public selectViewType(type: string) {
    this.changes.next(true);
    this.view.viewType = type;
  }

  public selectDocumentTypes() {
    const dialogRef = this.dialog.open(DocumentFilterComponent, {
      width: '500px',
      data: { 
        confirmMessage: "Select",
        showSwitcher: false,
        pageMode: 'documentTypes'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  public configureFilter() {
    const dialogRef = this.dialog.open(DocumentFilterComponent, {
      width: '500px',
      data: { 
        confirmMessage: "Select",
        showSwitcher: false,
        pageMode: 'filter'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }

  public onSave() {
    this.changes.next(false);
    this.save.emit(this.view);
  }

  public onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete this view?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.view);
      }
    });
  }

  public onClose() {
    this.close.emit();
  }

  constructor(private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.changes$.pipe(takeUntil(this.destroyed$)).subscribe(changes => {
      this.change.emit(changes);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.changes.next(false);
    }
  }
}

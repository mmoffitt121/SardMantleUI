import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, ReplaySubject, takeUntil } from 'rxjs';
import { DataPointSearchCriteria, DataPointTypeParameter, SearchCriteriaOptions, View, ViewTypes, ViewTypeSettings } from 'src/app/models/pages/view';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { ViewEditorService } from 'src/app/services/pages/view-editor.service';
import { ViewService } from 'src/app/services/pages/view.service';
import { DocumentFilterComponent } from 'src/app/views/document/document-filter/document-filter.component';
import { DocumentTypeComponent } from 'src/app/views/document/document-type/document-type.component';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { EditSettingsPopupComponent } from 'src/app/views/shared/edit-settings/edit-settings-popup/edit-settings-popup.component';
import { EditSettingsComponent } from 'src/app/views/shared/edit-settings/edit-settings.component';
import { EditLabelledSelectionListComponent } from 'src/app/views/shared/edit/edit-labelled-selection-list/edit-labelled-selection-list.component';
import { FormDialogComponent } from 'src/app/views/shared/form-dialog/form-dialog.component';
import { EditSearchbinsComponent } from './edit-searchbins/edit-searchbins.component';
import { ErrorService } from 'src/app/services/error.service';

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

  public documentTypes = [] as any[];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public viewTypes = ViewTypes;
  public viewTypeSettings = ViewTypeSettings;

  // -=-=-=-=-=-
  // States
  //   View - Shows preview of view
  //   Settings - Shows view settings
  public displayMode: string = "View";

  public settings: any;
  public settingsData: any;
  public settingsCategory: string;

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
        this.updateView();
        this.view.name = result[0].value;
        this.view.description = result[1].value;
        this.changes.next(true);
      }
    });
  }

  public selectViewType(type: string) {
    this.changes.next(true);
    this.view.viewType = type;
    this.configureViewOptions();
    this.viewUpdated();
  }

  public selectDocumentTypes() {
    const dialogRef = this.dialog.open(DocumentFilterComponent, {
      width: '500px',
      data: { 
        confirmMessage: "Select",
        showSwitcher: false,
        pageMode: 'documentTypes',
        criteria: this.view.searchCriteriaOptions!.criteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changes.next(true);
        this.view.searchCriteriaOptions!.criteria.typeIds = result.typeIds;
        this.loadDocumentTypes();
      }
    });
  }

  public configureFilter() {
    const dialogRef = this.dialog.open(DocumentFilterComponent, {
      width: '500px',
      data: { 
        confirmMessage: "Save Query",
        showSwitcher: false,
        pageMode: 'filter',
        criteria: this.view.searchCriteriaOptions!.criteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changes.next(true);
        this.view.searchCriteriaOptions!.criteria.query = result.query;
        this.view.searchCriteriaOptions!.criteria.parameters = result.parameters;
        this.view.searchCriteriaOptions!.criteria.parameterSearchOptions = result.parameterSearchOptions;
      }
    });
  }

  public configureUserFilter() {
    let parameters = this.documentTypes.map(dt => {
      return dt.typeParameters.filter((tp: any) => tp.typeValue != 'doc' && !tp.subType).map((p: any) => {
        return {
          value: p.id,
          label: p.name + " (" + dt.name + ")"
        }
      })
    }).flat();
    parameters.unshift({value: -1, label: "Name"})
    const dialogRef = this.dialog.open(EditLabelledSelectionListComponent, {
      width: '500px',
      height: 'min(100vh, 600px)',
      data: { 
        title: "Parameters User Can Filter By", 
        items: parameters,
        selectedItems: this.view.searchCriteriaOptions?.userFilterParameters?.map(p => p.id) ?? []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changes.next(true);
        this.view.searchCriteriaOptions!.userFilterParameters = this.documentTypes.flatMap(dt => dt.typeParameters).filter(p => result.includes(p.id));
        if (result.find((p: any) => p == -1)) {
          this.view.searchCriteriaOptions!.userFilterParameters.unshift({id: -1, name: "Name", dataPointTypeId: -1, typeValue: "str", sequence: -1} as DataPointTypeParameter);
        }
      }
    });
  }

  public loadDocumentTypes() {
    this.documentTypeService.getDocumentTypesFull({dataPointTypeIds: this.view.searchCriteriaOptions?.criteria?.typeIds ?? []}).subscribe(result => {
      this.documentTypes = result;
    })
  }

  public selectDisplayParameters() {
    let parameters = this.documentTypes.map(dt => {
      return dt.typeParameters.map((p: any) => {
        return {
          value: p.id,
          label: p.name + " (" + dt.name + ")"
        }
      })
    }).flat();
    let selected = this.view.searchCriteriaOptions?.criteria?.parameterReturnOptions?.filter(o => o.shouldReturn).map(o => o.typeParameterId);
    const dialogRef = this.dialog.open(EditLabelledSelectionListComponent, {
      width: '500px',
      height: 'min(100vh, 600px)',
      data: { 
        title: "Parameters to Display", 
        items: parameters,
        selectedItems: selected ?? []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.view.searchCriteriaOptions) {
        this.changes.next(true);
        this.view.searchCriteriaOptions.criteria.parameterReturnOptions = result.map((p: any) => ({typeParameterId: p, shouldReturn: true}));
      }
    });
  }

  public manageSearchBins() {
    const dialogRef = this.dialog.open(EditSearchbinsComponent, {
      width: 'min(100vw, 800px)',
      height: 'min(100vh, 600px)',
      data: { 
        view: this.view,
        types: this.documentTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.view.searchCriteriaOptions && result) {
        this.view.searchCriteriaOptions.criteria.parameterReturnOptions = result.map((p: any) => ({typeParameterId: p, shouldReturn: true}));
      }
      this.configureViewOptions();
      this.changes.next(true);
    });
  }

  public selectOrderByParameter() {
    let parameters = this.documentTypes.map(dt => {
      return dt.typeParameters.filter((tp: any) => tp.typeValue != 'doc').map((p: any) => {
        return {
          value: p.id,
          label: p.name + " (" + dt.name + ")"
        }
      })
    }).flat();
    parameters.unshift({value: -1, label: "Name"})
    const dialogRef = this.dialog.open(EditLabelledSelectionListComponent, {
      width: '500px',
      height: 'min(100vh, 600px)',
      data: { 
        title: "Default Order By", 
        items: parameters,
        single: true,
        selectedItems: this.view.searchCriteriaOptions?.criteria.orderByTypeParam ? [this.view.searchCriteriaOptions?.criteria.orderByTypeParam.id] : [-1]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result[0]) {
        let res = result[0]
        this.changes.next(true);
        this.view.searchCriteriaOptions!.criteria.orderByTypeParam = this.documentTypes.flatMap(dt => dt.typeParameters).find(p => p.id == res);
      }
    });
  }

  public toggleSortDirection() {
    this.view.searchCriteriaOptions!.criteria.orderByTypeParamDesc = !this.view.searchCriteriaOptions?.criteria.orderByTypeParamDesc;
    this.changes.next(true);
  }

  public selectUserOrderByParameter() {
    let parameters = this.documentTypes.map(dt => {
      return dt.typeParameters.filter((tp: any) => tp.typeValue != 'doc').map((p: any) => {
        return {
          value: p.id,
          label: p.name + " (" + dt.name + ")"
        }
      })
    }).flat();
    parameters.unshift({value: -1, label: "Name"})
    const dialogRef = this.dialog.open(EditLabelledSelectionListComponent, {
      width: '500px',
      height: 'min(100vh, 600px)',
      data: { 
        title: "Parameters User Can Order By", 
        items: parameters,
        selectedItems: this.view.searchCriteriaOptions?.userSortParameters?.map(p => p.id) ?? []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changes.next(true);
        this.view.searchCriteriaOptions!.userSortParameters = this.documentTypes.flatMap(dt => dt.typeParameters).filter(p => result.includes(p.id));
        if (result.find((p: any) => p == -1)) {
          this.view.searchCriteriaOptions!.userSortParameters.unshift({id: -1, name: "Name", dataPointTypeId: -1, typeValue: "str", sequence: -1} as DataPointTypeParameter);
        }
      }
    });
  }

  public displayPreview() {
    this.displayMode = "View"
  }

  public displaySettings() {
    this.displayMode = "Settings"
  }

  public onSave() {
    this.configureViewOptions();
    if (!this.validate()) {
      return;
    }
    this.changes.next(false);
    this.save.emit(this.view);
  }

  private configureViewOptions() {
    this.view!.searchCriteriaOptions!.criteria.includeTypes = true;
    this.view!.searchCriteriaOptions!.criteria.includeChildDataPoints = true;
    this.view!.searchCriteriaOptions!.criteria.includeRelevantLocations = false;
    this.view!.searchCriteriaOptions!.criteria.includeRelevantDataPoints = false;
    this.view!.searchCriteriaOptions!.criteria.includeParameters = true;
    this.view!.searchCriteriaOptions!.criteria.includeChildParameters = false;

    if (this.view.viewType.includes("Timeline") && (this.view!.searchCriteriaOptions!.criteria!.searchBinCriteria ?? [])[0]?.typeValue == 'tim') {
      this.view!.searchCriteriaOptions!.criteria.orderByBin = 0;
    } else {
      this.view!.searchCriteriaOptions!.criteria.orderByBin = undefined;
    }

    switch (this.view.viewType) {
      case "Card":
        break;
      case "List":
        this.view!.searchCriteriaOptions!.criteria.includeParameters = false;
        this.view!.searchCriteriaOptions!.criteria.includeTypes = false;
        this.view!.searchCriteriaOptions!.criteria.includeChildDataPoints = false;
        break;
      default:
        break;
    }
  }

  private validate() {
    if (this.view.viewType.includes('Timeline')) {
      if (!((this.view.searchCriteriaOptions?.criteria.searchBinCriteria ?? [])[0]?.typeValue == 'tim')) {
        this.errorService.showSnackBar("The top search bin must be of type Date/Time for timeline views. Open the \"Manage Search Bins\" menu and configure a Date/Time search bin, and make sure it is at the top of the list.", 10000)
        return false;
      }
    }
    return true;
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

  public updateView() {
    let temp = this.view;
    this.view = {} as View;
    this.cdref.detectChanges();
    this.view = temp;
  }

  handleSettingChanged(data: any) {
    this.view.settings = data;
  }

  public viewUpdated() {
    this.displayMode = "View"
    this.settings = this.editorService.getViewOptions(this.view.viewType);
    this.settingsData = { ...this.editorService.getViewDefaults(this.view.viewType), ...this.view.settings };
    if (this.view.searchCriteriaOptions == null) {
      this.view.searchCriteriaOptions = {} as SearchCriteriaOptions;
    }
    if (this.view.searchCriteriaOptions.criteria == null) {
      this.view.searchCriteriaOptions.criteria = {} as DataPointSearchCriteria;
    }
    this.loadDocumentTypes();
    this.changes.next(false);
  }

  constructor(
    private dialog: MatDialog, 
    private calendarService: CalendarService,  
    private editorService: ViewEditorService, 
    private documentTypeService: DocumentTypeService, 
    private cdref: ChangeDetectorRef,
    private errorService: ErrorService
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.changes$.pipe(takeUntil(this.destroyed$)).subscribe(changes => {
      this.updateView();
      this.change.emit(changes);
    })
    this.calendarService.ensureCalendarsLoaded();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.viewUpdated();
    }
  }
}

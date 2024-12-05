import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { DataPointQueryResult, QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { DataPointSearchCriteria, DataPointTypeParameter, ParameterSearchOptions, View } from 'src/app/models/pages/view';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { ErrorService } from 'src/app/services/error.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { UrlService } from 'src/app/services/url/url.service';
import { DocumentPopupComponent } from 'src/app/views/shared/document-components/document-popup/document-popup.component';
import { DestroyableComponent } from 'src/app/views/shared/util/destroyable/destroyable.component';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent extends DestroyableComponent implements OnInit, OnChanges {
  @Input() view: View;
  public data: DataPointQueryResult;
  public dataLoaded$: ReplaySubject<DataPointQueryResult> = new ReplaySubject(1);
  public title: string;

  @Input() previewMode: boolean = false;
  @Input() isRoot: boolean = false;

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 25;

  public searchDocument: QueriedDataPoint;
  public searchDocumentQueryOptions: ParameterSearchOptions[];

  public showSearch = true;

  public onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.view.searchCriteriaOptions!.criteria.pageNumber = this.pageIndex + 1;
    this.view.searchCriteriaOptions!.criteria.pageSize = this.pageSize;

    this.loadView();
  }

  public onSearch() {
    this.loadView();
  }

  public toggleSortDirection() {
    this.view.searchCriteriaOptions!.criteria.orderByTypeParamDesc = !this.view.searchCriteriaOptions?.criteria.orderByTypeParamDesc;
    this.loadView();
  }

  public setSort(sort: DataPointTypeParameter) {
    if (sort.id == -1) {
      this.view.searchCriteriaOptions!.criteria.orderByTypeParam = undefined;
    } else {
      this.view.searchCriteriaOptions!.criteria.orderByTypeParam = sort;
    }
    
    this.loadView();
  }

  public loadView() {
    let searchCriteria: DataPointSearchCriteria = {...this.view.searchCriteriaOptions!.criteria};
    let params = [...this.view.searchCriteriaOptions?.criteria.parameters ?? []];
    let searchOptions = [...this.view.searchCriteriaOptions?.criteria.parameterSearchOptions ?? []];

    let realDocument = this.viewQueryService.queryDocumentToRealDocument(this.searchDocument);

    for (let i = 0; i < this.searchDocument.parameters.length; i++) {
      if (this.searchDocument.parameters[i].value !== undefined && this.searchDocument.parameters[i].value !== "") {
        if (realDocument.parameters[i].dataPointTypeParameterId == -1) {
          searchCriteria.query = this.searchDocument.parameters[i].value;
        } else {
          params.push(realDocument.parameters[i]);
          searchOptions.push(this.searchDocumentQueryOptions[i])
        }
      }
    }

    searchCriteria.parameters = params;
    searchCriteria.parameterSearchOptions = searchOptions;

    if (this.view) {
      this.queryService.query(searchCriteria).subscribe(result => {
        this.data = result;
        this.dataLoaded$.next(this.data);
        this.pageLength = result.count;
      }, error => this.errorService.handle(error))
    }
  }

  public initView() {
    this.pageIndex = 0;
    this.pageSize = 25;
    this.view.searchCriteriaOptions!.criteria.pageNumber = this.pageIndex + 1;
    this.view.searchCriteriaOptions!.criteria.pageSize = this.pageSize;

    let searchParams = this.view.searchCriteriaOptions!.userFilterParameters?.map(fp => ({
      typeParameterId: fp.id, 
      typeParameterName: fp.name,
      typeParameterSummary: fp.summary,
      typeParameterTypeValue: fp.typeValue,
      typeParameterSequence: fp.sequence,
      dataPointTypeReferenceId: fp.dataPointTypeReferenceId,
      typeParameterSettings: fp.settings,
      value: undefined,
      valueData: undefined,
      values: undefined,
      valuesData: undefined,
      isMultiple: false,
    })) ?? []

    this.searchDocument = {
      id: -1,
      name: "Search",
      settings: "",
      typeId: -1,
      typeName: "",
      typeSummary: "",
      typeSettings: "",
      parameters: searchParams,
    };

    this.searchDocumentQueryOptions = this.searchDocument.parameters.map(p => ({dataPointTypeParameterId: p.typeParameterId, filterMode: 0, sequenceId: p.typeParameterSequence}));
    this.loadView();
  }

  public popupDocument(doc: any) {
    const ref = this.dialog.open(DocumentPopupComponent,  {
      width: 'min(100vw, 750px)',
      height: 'min(100vh, 900px)',
      data: { 
        id: doc.id
      }
    })
  }

  public maybeAdd() {
    if (this.data?.types?.length == 1) {
      this.add(this.data.types[0]);
    }
  }

  public add(type: any) {
    this.router.navigate([this.urlService.getWorld(), 'document', 'add', type.id])
  }

  constructor(
    public queryService: ViewQueryService, 
    public errorService: ErrorService, 
    private documentService: DocumentService, 
    private typeService: DocumentTypeService, 
    public dialog: MatDialog, 
    private router: Router, 
    private urlService: UrlService,
    private viewQueryService: ViewQueryService,
    public skeletonService: SkeletonService
  ) { super(); }

  public ngOnInit(): void {
    this.showSearch = this.view.settings?.showSearchByDefault == 'true'
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["view"]) {
      if (this.previewMode) {
        this.title = this.view.name + " (Editor Preview)";
      } else {
        this.title = this.view.name;
      }
      this.initView();
    }
  }
}

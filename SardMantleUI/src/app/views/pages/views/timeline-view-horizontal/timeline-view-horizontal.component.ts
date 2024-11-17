import { Component } from '@angular/core';
import { GenericViewComponent } from '../generic-view/generic-view.component';
import { take, takeUntil } from 'rxjs';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { ErrorService } from 'src/app/services/error.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
import { SkeletonService } from 'src/app/services/skeleton/skeleton.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

@Component({
  selector: 'app-timeline-view-horizontal',
  templateUrl: './timeline-view-horizontal.component.html',
  styleUrls: ['./timeline-view-horizontal.component.scss']
})
export class TimelineViewHorizontalComponent extends GenericViewComponent {
  public resultData?: any[] = [];

  public populateResultData() {
    this.resultData = [];
    this.data.results.forEach(result => {
      this.calendarService.$calendarsLoaded.pipe(take(1)).subscribe(cal => {
        if (!this.view.searchCriteriaOptions?.criteria.searchBinCriteria) {
          return;
        }
        const binIndex = this.view.searchCriteriaOptions?.criteria.orderByBin ?? 0;
        const bin = this.view.searchCriteriaOptions!.criteria!.searchBinCriteria![binIndex];
        const param = result.parameters.filter(x => bin.parameters.includes(x.typeParameterId))[0];
        
        if (!param) {
          return;
        }

        let i = this.view.settings?.timelineCalendar ?? 1;
        let calendar = this.calendarService.calendars.find(c => c.id == i);

        if (!this.resultData) return;

        this.resultData.push({name: param.typeParameterName, value: this.calendarService.format(param.value, calendar)});
      })
    })
  }

  constructor(queryService: ViewQueryService, 
    errorService: ErrorService, 
    documentService: DocumentService, 
    typeService: DocumentTypeService, 
    dialog: MatDialog, 
    router: Router, 
    urlService: UrlService,
    viewQueryService: ViewQueryService,
    skeletonService: SkeletonService,
    private calendarService: CalendarService) {
    super(queryService, 
      errorService, 
      documentService, 
      typeService, 
      dialog, 
      router, 
      urlService,
      viewQueryService,
      skeletonService);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.dataLoaded$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.populateResultData();
    });
  }
}

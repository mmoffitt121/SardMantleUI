import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataPointQueryResult } from 'src/app/models/document/document-query-result';
import { View } from 'src/app/models/pages/view';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent implements OnInit, OnChanges {
  @Input() view: View;
  public data: DataPointQueryResult;

  public loadView() {
    if (this.view) {
      this.queryService.query(this.view.searchCriteriaOptions?.criteria).subscribe(result => {
        this.data = result;
        console.log(result)
      }, error => this.errorService.handle(error))
    }
  }

  constructor(public queryService: ViewQueryService, public errorService: ErrorService) {}

  public ngOnInit(): void {
    this.loadView();
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["view"]) {
      this.loadView();
    }
  }
}

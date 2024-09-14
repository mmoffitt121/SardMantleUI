import { query } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { GenericViewComponent } from '../generic-view/generic-view.component';
import { DataPointTypeParameter, View } from 'src/app/models/pages/view';
import { DataPointQueryResult } from 'src/app/models/document/document-query-result';
import { ErrorService } from 'src/app/services/error.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent extends GenericViewComponent implements OnInit {
  public articles: any[];
  public override ngOnInit(): void {
    super.ngOnInit();
    this.dataLoaded$.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.articles = [];
      if (this.view.settings?.cardArticleDisplay == 'atBottom') {
        this.data.results.forEach(result => {
          let articlesOfResult = result.parameters.filter(p => p.typeParameterTypeValue == "doc") ?? [];
          this.articles.push(articlesOfResult);
          result.parameters = result.parameters.filter(p => p.typeParameterTypeValue != "doc");
        })
      }
    })
  }
}

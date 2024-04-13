import { query } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { GenericViewComponent } from '../generic-view/generic-view.component';
import { View } from 'src/app/models/pages/view';
import { DataPointQueryResult } from 'src/app/models/document/document-query-result';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent extends GenericViewComponent implements OnInit, OnChanges {
  
}

import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ViewQueryService } from 'src/app/services/document/view-query.service';
import { GenericViewComponent } from '../generic-view/generic-view.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent extends GenericViewComponent {
  
}

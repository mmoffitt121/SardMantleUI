import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ViewQueryService } from 'src/app/services/pages/view-query.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  constructor(queryService: ViewQueryService) {
    queryService.query({}).subscribe(data => {
      console.log(data)
    })
  }
}

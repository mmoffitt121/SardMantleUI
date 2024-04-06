import { Component, OnInit } from '@angular/core';
import { ViewQueryService } from 'src/app/services/document/view-query.service';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent implements OnInit {
  
  constructor(public queryService: ViewQueryService) {}

  public ngOnInit(): void {
    
  }
}

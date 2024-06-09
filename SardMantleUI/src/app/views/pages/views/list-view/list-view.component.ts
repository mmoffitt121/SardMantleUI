import { Component } from '@angular/core';
import { GenericViewComponent } from '../generic-view/generic-view.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent extends GenericViewComponent {
  public id: number | undefined;

  public select(id: number) {
    this.id = id;
  }
}

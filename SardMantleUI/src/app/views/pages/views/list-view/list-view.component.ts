import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericViewComponent } from '../generic-view/generic-view.component';
import { MatDrawer } from '@angular/material/sidenav';

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

import { Component } from '@angular/core';
import { Page } from 'src/app/models/pages/page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  public page: Page | undefined

  public add() {
    
  }
}

import { Injectable } from '@angular/core';
import { Page } from 'src/app/models/pages/page';
import { PageService } from './page.service';
import { BehaviorSubject, take } from 'rxjs';
import { PageViewElementComponent } from 'src/app/views/pages/pages/page-view/page-view-element/page-view-element.component';

export interface PageObjectType {
  name: string,
  settings: ElementSetting[]
}

export interface ElementSetting {
  type: number,
  key: string,
  value: string,
  configurable: boolean,
  possibleValues: string[] | undefined
}

@Injectable({
  providedIn: 'root'
})
export class PageEditorService {
  public pageObjectTypes = new BehaviorSubject<PageObjectType[]>([]); 

  public select(viewElement: PageViewElementComponent) {

  }

  constructor(private pageService: PageService) { 
    this.pageService.getPageObjects().pipe(take(1)).subscribe(result => {
      this.pageObjectTypes.next(Object.keys(result).map(key => ({name: key.replace(/([A-Z])/g, " $1").trimStart(), settings: result[key]})));
    })
  }
}

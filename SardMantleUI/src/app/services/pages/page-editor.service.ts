import { Injectable } from '@angular/core';
import { Page, PageElement } from 'src/app/models/pages/page';
import { PageService } from './page.service';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { PageViewElementComponent } from 'src/app/views/pages/pages/page-view/page-view-element/page-view-element.component';
import { SettingJsonService } from '../settings/setting-json.service';
import { ErrorService } from '../error.service';

export interface PageObjectType {
  name: string,
  settings: ElementSetting[]
}

export interface NameIdPair {
  id: string;
  name: string;
}

export interface ElementSetting {
  type: number,
  key: string,
  value: string,
  configurable: boolean,
  possibleValues: NameIdPair[] | undefined
}

@Injectable({
  providedIn: 'root'
})
export class PageEditorService {
  public pageObjectTypes = new BehaviorSubject<PageObjectType[]>([]); 

  public selected = new BehaviorSubject<PageElement | undefined>(undefined);
  public editing = new BehaviorSubject<boolean>(false);
  public styleUpdate = new Subject<void>();
  public saved = new Subject<void>();

  public select(viewElement: PageElement | undefined) {
    this.selected.next(viewElement);
  }

  public setEditing(editing: boolean) {
    this.editing.next(editing);
  }

  public updateStyle() {
    this.styleUpdate.next();
  }

  public save() {
    this.saved.next();
  }

  public setDefault(pageId: string) {
    let setting = {
      id: "libratlas.pages.default",
      setting: pageId
    }
    this.settingService.put(setting).pipe(take(1)).subscribe(result => {
      this.errorService.showSnackBar("Page set as default.");
    }, error => {
      this.errorService.handle(error);
    })
  }

  constructor(private pageService: PageService, private settingService: SettingJsonService, private errorService: ErrorService) { 
    this.pageService.getPageObjects().pipe(take(1)).subscribe(result => {
      this.pageObjectTypes.next(Object.keys(result).map(key => ({name: key.replace(/([A-Z])/g, " $1").trimStart(), settings: result[key]})));
    })
  }
}

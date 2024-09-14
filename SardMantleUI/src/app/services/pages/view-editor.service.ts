import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cardMenuItems, defaultCardViewSettings, defaultListViewSettings, defaultViewSettings, listMenuItems, searchableViewMenuItems } from 'src/app/models/pages/view-editor-constants';

@Injectable({
  providedIn: 'root'
})
export class ViewEditorService {
    public getViewOptions(viewType: string) {
        let menuItems = [] as any[];

        switch (viewType) {
            case "Card":
                menuItems = [...searchableViewMenuItems, ...cardMenuItems];
                break;
            case "List":
                menuItems = [...searchableViewMenuItems, ...listMenuItems];
                break;
        }

        return menuItems;
    }

    public getViewDefaults(viewType: string) {
        let viewSettings = {} as any;

        switch (viewType) {
            case "Card":
                viewSettings = {...defaultViewSettings, ...defaultCardViewSettings};
                break;
            case "List":
                viewSettings = {...defaultViewSettings, ...defaultListViewSettings};
                break;
        }

        return viewSettings;
    }

    constructor() { }
}

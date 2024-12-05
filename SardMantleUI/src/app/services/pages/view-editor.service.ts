import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cardMenuItems, defaultCardViewSettings, defaultListViewSettings, defaultMapViewSettings, defaultTimelineViewSettings, defaultViewSettings, listMenuItems, mapMenuItems, searchableViewMenuItems, timelineMenuItems } from 'src/app/models/pages/view-editor-constants';
import { CalendarService } from '../calendar/calendar.service';

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
            case "Timeline":
                let calendars = this.calendarService.calendars.map(cal => ({id: cal.id, name: cal.name}));
                menuItems = [
                    ...searchableViewMenuItems, 
                    ...JSON.parse(JSON.stringify(timelineMenuItems)), // Easy deep copy
                ];

                menuItems.find(mi => mi.name == "Timeline Settings").children.push({
                    name: "Calendar",
                    items: [
                        {
                            name: "Display Calendar",
                            key: "timelineCalendar",
                            value: undefined,
                            type: "select",
                            options: calendars,
                        },
                    ]
                });
                break;
            case "Map":
                menuItems = [...mapMenuItems]
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
            case "Timeline":
                let cal = this.calendarService.calendars[0];
                viewSettings = {...defaultViewSettings, ...defaultTimelineViewSettings, "timelineCalendar": cal.id};
                break;
            case "Map":
                viewSettings = {...defaultMapViewSettings};
                break;
        }

        return viewSettings;
    }

    constructor(private calendarService: CalendarService) { }
}

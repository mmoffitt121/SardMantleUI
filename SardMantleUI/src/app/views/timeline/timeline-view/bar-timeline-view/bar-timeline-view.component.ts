import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TimelineViewComponent } from '../timeline-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { TimelineItem, TimelineRow } from 'src/app/models/timeline/timeline-item';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { EditStringComponent } from 'src/app/views/shared/document-components/edit/edit-string/edit-string.component';

@Component({
  selector: 'app-bar-timeline-view',
  templateUrl: './bar-timeline-view.component.html',
  styleUrls: ['./bar-timeline-view.component.scss']
})
export class BarTimelineViewComponent extends TimelineViewComponent implements OnInit {
  public bottomPanelOpen = false;
  public editingEras = false;

  public pageMode = "nav";

  public beginningYear = 0;
  public endYear = 1;

  public displaySize = window.innerWidth;
  public calendarStart = 0n;
  public calendarEnd = 0n;
  public calendarLength = 0n;

  public currentScrollLeft = 0;
  public currentScrollTop = 0;
  public currentScrollWidth = 0;
  public zoom = 1;
  public zoomDelta = 10;
  public minZoom = 1;
  public maxZoom = 1000;

  public lanes: TimelineRow[] = [];
  public selectedItem: TimelineItem | undefined;
  public editingName = "";
  public editingBeginningTime = 0n;
  public editingEndingTime = 0n;

  @ViewChild('editName') editName: EditStringComponent;

  private unsubscribe$ = new Subject();

  public displayItems() {
    this.lanes = [];

    let rangeWidth = BigInt(this.displaySize);
    this.calendarStart = this.calendarService.getDateTimeFromBaseYear(BigInt(this.beginningYear), this.calendar);
    this.calendarEnd = this.calendarService.getDateTimeFromBaseYear(BigInt(this.endYear), this.calendar);
    this.calendarLength = this.calendarEnd - this.calendarStart;

    this.calendar.eras.forEach(era => {
      let lane = { objectType: era, items: [] } as TimelineRow;
      for (let i = 0; i < era.eraDefinitions?.length ?? 0; i++) {
        let def = era.eraDefinitions[i];
        if (!(BigInt(def.start) > this.calendarEnd || BigInt(def.end) < this.calendarStart)) {
          let timelineItem = this.buildTimelineItem(def);
          if (this.selectedItem?.object === timelineItem.object) {
            timelineItem.selected = true;
          }
          lane.items.push(timelineItem);
        }
      }
      this.lanes.push(lane);
    });
  }

  public buildTimelineItem(obj: any) {
    let laneItem = {
      object: obj,
      startDate: BigInt(obj.start),
      endDate: BigInt(obj.end) ?? this.calendarEnd,
      active: true
    } as TimelineItem

    this.setScreenPosition(laneItem);

    return laneItem;
  }

  public setScreenPosition(item: TimelineItem) {
    let timeOffset = this.calendarStart;
    let timeRange = this.calendarEnd - this.calendarStart;

    let startDisplay = Number((item.startDate - timeOffset) * BigInt(this.displaySize) / timeRange);
    let endDisplay = Number(((item.endDate ?? -1n) - timeOffset) * BigInt(this.displaySize) / timeRange);
    let startCal = Number((this.calendarStart - timeOffset) * BigInt(this.displaySize) / timeRange);
    let endCal = Number(((this.calendarEnd ?? -1n) - timeOffset) * BigInt(this.displaySize) / timeRange);

    item.startDisplay = Math.max(startDisplay, startCal);
    item.endDisplay = Math.min(endDisplay, endCal);
    item.offScreenStart = startDisplay < startCal;
    item.offScreenEnd = endDisplay > endCal;
  }

  public calcBorderRadius(item: TimelineItem) {
    return (item.offScreenStart ? "0px" : "15px")
     + " " + (item.offScreenEnd ? "0px" : "15px")
     + " " + (item.offScreenEnd ? "0px" : "15px")
     + " " + (item.offScreenStart ? "0px" : "15px");
  }

  public zoomIn() {
    this.zoom += this.zoomDelta;
    if (this.zoom > this.maxZoom) { this.zoom = this.maxZoom; }
  }

  public zoomOut() {
    this.zoom -= this.zoomDelta;
    if (this.zoom < this.minZoom) { this.zoom = this.minZoom; }
  }

  public scrub(dif: number) {
    let panel = document.querySelector("#timelinePanel");
    if (!panel) return;

    let pos = this.currentScrollLeft + dif;
    if (pos > panel?.scrollWidth) pos = panel?.scrollWidth;
    if (pos < 0) pos = 0;

    panel.scroll(pos, this.currentScrollTop);
  }

  public onItemClick(item: TimelineItem) {
    if (!item.selected) {
      this.lanes.forEach(lane => {
        lane.items.forEach(i => {
          i.selected = false;
        })
      })
  
      item.selected = true;
      this.pageMode = "edit";
      this.selectedItem = item;

      this.editingBeginningTime = item.startDate;
      this.editingEndingTime = item.endDate!;
      this.editingName = item.object?.name ?? "";
      this.editName?.setValue(this.editingName);
    }
  }

  public onChange() {
    if (!this.selectedItem || !this.selectedItem.object) { return; }

    this.selectedItem.startDate = this.editingBeginningTime;
    this.selectedItem.endDate = this.editingEndingTime;
    
    this.selectedItem.object.start = this.editingBeginningTime.toString();
    this.selectedItem.object.end = this.editingEndingTime.toString();
    this.selectedItem.object.name = this.editingName;
    this.displayItems();
  }

  public close() {
    this.dialogRef.close();
  }
  
  constructor (public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private calendarService: CalendarService) {
    super();
    if (data.calendar) { this.calendar = data.calendar; }
    if (data.editingEras) { 
      this.editingEras = data.editingEras; 
      this.beginning = 0n;
      this.end = undefined;
      this.bottomPanelOpen = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next("unsub");
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.displayItems();
    let panel = document.querySelector("#timelinePanel")
    if (panel) {
      fromEvent(panel, 'scroll')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((e: Event) => {
          this.currentScrollLeft = (e.target as HTMLTextAreaElement).scrollLeft;
          this.currentScrollTop = (e.target as HTMLTextAreaElement).scrollTop;
          this.currentScrollWidth = (e.target as HTMLTextAreaElement).scrollWidth;
        });
    }
  }
}

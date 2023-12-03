import { Component, Inject, OnInit } from '@angular/core';
import { TimelineViewComponent } from '../timeline-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/views/shared/confirm-dialog/confirm-dialog.component';
import { TimelineItem, TimelineRow } from 'src/app/models/timeline/timeline-item';

@Component({
  selector: 'app-bar-timeline-view',
  templateUrl: './bar-timeline-view.component.html',
  styleUrls: ['./bar-timeline-view.component.scss']
})
export class BarTimelineViewComponent extends TimelineViewComponent implements OnInit {
  public bottomPanelOpen = false;
  public editingEras = false;

  public lanes: TimelineRow[] = [];
  
  constructor (public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    if (data.calendar) { this.calendar = data.calendar; }
    if (data.editingEras) { 
      this.editingEras = data.editingEras; 
      this.beginning = 0n;
      this.end = undefined;
      this.bottomPanelOpen = true;
    }
  }

  ngOnInit(): void {
    let rangeWidth = 1920;
    let rangeWidthBigInt = BigInt(rangeWidth);
    let calendarStart = 1_000_000n;
    let calendarEnd = 10_000_000n;
    let calendarLength = calendarEnd - calendarStart;
    this.calendar.eras.forEach(era => {
      let lane = { objectType: era, items: [] } as TimelineRow;
      for (let i = 0; i < era.eraDefinitions?.length ?? 0; i++) {
        let def = era.eraDefinitions[i];
        let next = era.eraDefinitions[i+1] ?? {start: calendarEnd};
        lane.items.push({
          object: def,
          startDate: BigInt(def.start),
          endDate: BigInt(def.end) ?? calendarEnd,
          active: true,
          startDisplay: Number(BigInt(def.start) * rangeWidthBigInt / calendarEnd),
          endDisplay: Number(BigInt(def.end) * rangeWidthBigInt / calendarEnd),
        } as TimelineItem)
        console.log(lane.items[i])
      }
      this.lanes.push(lane);
    })
  }
}

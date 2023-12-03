import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Calendar } from 'src/app/models/units/calendar';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss']
})
export class TimelineViewComponent {
  @Input() calendar: Calendar;
  @Input() documents: Document[];
  @Input() beginning: bigint;
  @Input() end: bigint | undefined;
}

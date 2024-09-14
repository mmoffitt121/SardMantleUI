import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-bool',
  templateUrl: './view-bool.component.html',
  styleUrls: ['./view-bool.component.scss']
})
export class ViewBoolComponent {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() value: any;
}

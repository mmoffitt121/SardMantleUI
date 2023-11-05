import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-double',
  templateUrl: './view-double.component.html',
  styleUrls: ['./view-double.component.scss']
})
export class ViewDoubleComponent {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() value: string;
}

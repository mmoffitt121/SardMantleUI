import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-string',
  templateUrl: './view-string.component.html',
  styleUrls: ['./view-string.component.scss']
})
export class ViewStringComponent {
  @Input() parameterName: string = 'Parameter Name';
  @Input() parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  @Input() value: string;
}

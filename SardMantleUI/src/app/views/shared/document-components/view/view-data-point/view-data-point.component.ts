import { Component } from '@angular/core';

@Component({
  selector: 'app-view-data-point',
  templateUrl: './view-data-point.component.html',
  styleUrls: ['./view-data-point.component.css']
})
export class ViewDataPointComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public value: string;
}

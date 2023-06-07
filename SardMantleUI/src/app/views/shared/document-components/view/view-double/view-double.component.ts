import { Component } from '@angular/core';

@Component({
  selector: 'app-view-double',
  templateUrl: './view-double.component.html',
  styleUrls: ['./view-double.component.css']
})
export class ViewDoubleComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public value: string;
}

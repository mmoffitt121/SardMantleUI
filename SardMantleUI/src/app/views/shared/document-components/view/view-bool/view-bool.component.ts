import { Component } from '@angular/core';

@Component({
  selector: 'app-view-bool',
  templateUrl: './view-bool.component.html',
  styleUrls: ['./view-bool.component.scss']
})
export class ViewBoolComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public value: any;
}

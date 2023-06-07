import { Component } from '@angular/core';

@Component({
  selector: 'app-view-string',
  templateUrl: './view-string.component.html',
  styleUrls: ['./view-string.component.css']
})
export class ViewStringComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public value: string;
}

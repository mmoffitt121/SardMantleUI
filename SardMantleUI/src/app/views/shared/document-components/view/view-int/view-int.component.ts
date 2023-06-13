import { Component } from '@angular/core';

@Component({
  selector: 'app-view-int',
  templateUrl: './view-int.component.html',
  styleUrls: ['./view-int.component.scss']
})
export class ViewIntComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
  public value: string;
}

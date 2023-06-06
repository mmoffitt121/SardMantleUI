import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-summary',
  templateUrl: './edit-summary.component.html',
  styleUrls: ['./edit-summary.component.css']
})
export class EditSummaryComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrls: ['./edit-string.component.css']
})
export class EditStringComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
}

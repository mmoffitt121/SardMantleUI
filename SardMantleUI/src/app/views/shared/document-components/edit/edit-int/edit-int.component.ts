import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-int',
  templateUrl: './edit-int.component.html',
  styleUrls: ['./edit-int.component.css']
})
export class EditIntComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
}

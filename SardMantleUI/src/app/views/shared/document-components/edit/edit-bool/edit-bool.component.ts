import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-bool',
  templateUrl: './edit-bool.component.html',
  styleUrls: ['./edit-bool.component.css']
})
export class EditBoolComponent {
  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?';
}

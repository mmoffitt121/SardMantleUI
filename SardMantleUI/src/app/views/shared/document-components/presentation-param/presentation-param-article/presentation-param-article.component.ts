import { Component, Inject, Optional } from '@angular/core';
import { PresentationParamBaseComponent } from '../presentation-param-base/presentation-param-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-presentation-param-article',
  templateUrl: './presentation-param-article.component.html',
  styleUrls: ['./presentation-param-article.component.scss']
})
export class PresentationParamArticleComponent extends PresentationParamBaseComponent {
  public windowed: boolean = false;

  constructor(@Optional() public windowRef?: MatDialogRef<PresentationParamArticleComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data?: any) { 
    super(); 
    if (data && data.parameter) {
      this.parameter = data.parameter;
      this.windowed = true;
    }
  }
}

import { Component } from '@angular/core';
import { PresentationParamArticleComponent } from '../../presentation-param/presentation-param-article/presentation-param-article.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-param-article',
  templateUrl: './view-param-article.component.html',
  styleUrls: ['./view-param-article.component.scss']
})
export class ViewParamArticleComponent extends PresentationParamArticleComponent {
  public popupArticle() {
    const ref = this.dialog.open(PresentationParamArticleComponent,  {
      width: 'min(100vw, 750px)',
      height: 'min(100vh, 900px)',
      data: { 
        parameter: this.parameter
      }
    })
  }

  constructor(private dialog: MatDialog) { super(undefined, undefined); }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParamArticleComponent } from './view-param-article.component';

describe('ViewParamArticleComponent', () => {
  let component: ViewParamArticleComponent;
  let fixture: ComponentFixture<ViewParamArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParamArticleComponent]
    });
    fixture = TestBed.createComponent(ViewParamArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

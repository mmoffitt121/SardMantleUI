import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamArticleComponent } from './presentation-param-article.component';

describe('PresentationParamArticleComponent', () => {
  let component: PresentationParamArticleComponent;
  let fixture: ComponentFixture<PresentationParamArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamArticleComponent]
    });
    fixture = TestBed.createComponent(PresentationParamArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

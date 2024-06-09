import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldArticleComponent } from './form-field-article.component';

describe('FormFieldArticleComponent', () => {
  let component: FormFieldArticleComponent;
  let fixture: ComponentFixture<FormFieldArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldArticleComponent]
    });
    fixture = TestBed.createComponent(FormFieldArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

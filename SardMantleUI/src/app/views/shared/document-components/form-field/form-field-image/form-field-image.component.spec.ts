import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldImageComponent } from './form-field-image.component';

describe('FormFieldImageComponent', () => {
  let component: FormFieldImageComponent;
  let fixture: ComponentFixture<FormFieldImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldImageComponent]
    });
    fixture = TestBed.createComponent(FormFieldImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

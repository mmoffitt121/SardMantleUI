import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldDateComponent } from './form-field-date.component';

describe('FormFieldDateComponent', () => {
  let component: FormFieldDateComponent;
  let fixture: ComponentFixture<FormFieldDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldDateComponent]
    });
    fixture = TestBed.createComponent(FormFieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

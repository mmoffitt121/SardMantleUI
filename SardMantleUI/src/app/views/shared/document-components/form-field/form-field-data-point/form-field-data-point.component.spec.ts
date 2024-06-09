import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldDataPointComponent } from './form-field-data-point.component';

describe('FormFieldDataPointComponent', () => {
  let component: FormFieldDataPointComponent;
  let fixture: ComponentFixture<FormFieldDataPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldDataPointComponent]
    });
    fixture = TestBed.createComponent(FormFieldDataPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

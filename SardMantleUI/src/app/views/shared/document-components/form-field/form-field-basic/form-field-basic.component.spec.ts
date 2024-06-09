import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldBasicComponent } from './form-field-basic.component';

describe('FormFieldBasicComponent', () => {
  let component: FormFieldBasicComponent;
  let fixture: ComponentFixture<FormFieldBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldBasicComponent]
    });
    fixture = TestBed.createComponent(FormFieldBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

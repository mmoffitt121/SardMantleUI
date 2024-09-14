import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldUnitComponent } from './form-field-unit.component';

describe('FormFieldUnitComponent', () => {
  let component: FormFieldUnitComponent;
  let fixture: ComponentFixture<FormFieldUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldUnitComponent]
    });
    fixture = TestBed.createComponent(FormFieldUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

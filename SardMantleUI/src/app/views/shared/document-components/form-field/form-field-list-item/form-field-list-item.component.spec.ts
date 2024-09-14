import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldListItemComponent } from './form-field-list-item.component';

describe('FormFieldListItemComponent', () => {
  let component: FormFieldListItemComponent;
  let fixture: ComponentFixture<FormFieldListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldListItemComponent]
    });
    fixture = TestBed.createComponent(FormFieldListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

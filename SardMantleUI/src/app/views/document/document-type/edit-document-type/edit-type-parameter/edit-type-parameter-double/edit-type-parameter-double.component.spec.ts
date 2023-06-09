import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterDoubleComponent } from './edit-type-parameter-double.component';

describe('EditTypeParameterDoubleComponent', () => {
  let component: EditTypeParameterDoubleComponent;
  let fixture: ComponentFixture<EditTypeParameterDoubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterDoubleComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

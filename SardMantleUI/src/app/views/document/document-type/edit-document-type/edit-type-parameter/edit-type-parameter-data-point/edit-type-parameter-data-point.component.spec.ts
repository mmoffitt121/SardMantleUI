import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterDataPointComponent } from './edit-type-parameter-data-point.component';

describe('EditTypeParameterDataPointComponent', () => {
  let component: EditTypeParameterDataPointComponent;
  let fixture: ComponentFixture<EditTypeParameterDataPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterDataPointComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterDataPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

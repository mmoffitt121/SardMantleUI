import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterSummaryComponent } from './edit-type-parameter-summary.component';

describe('EditTypeParameterSummaryComponent', () => {
  let component: EditTypeParameterSummaryComponent;
  let fixture: ComponentFixture<EditTypeParameterSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterSummaryComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

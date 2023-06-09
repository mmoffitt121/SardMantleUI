import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterIntComponent } from './edit-type-parameter-int.component';

describe('EditTypeParameterIntComponent', () => {
  let component: EditTypeParameterIntComponent;
  let fixture: ComponentFixture<EditTypeParameterIntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterIntComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

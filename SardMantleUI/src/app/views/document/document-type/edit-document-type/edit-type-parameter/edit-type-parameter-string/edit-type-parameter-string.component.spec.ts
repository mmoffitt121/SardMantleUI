import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterStringComponent } from './edit-type-parameter-string.component';

describe('EditTypeParameterStringComponent', () => {
  let component: EditTypeParameterStringComponent;
  let fixture: ComponentFixture<EditTypeParameterStringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterStringComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

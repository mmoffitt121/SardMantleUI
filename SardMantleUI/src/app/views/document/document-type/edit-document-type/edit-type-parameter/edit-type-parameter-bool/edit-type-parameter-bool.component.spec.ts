import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterBoolComponent } from './edit-type-parameter-bool.component';

describe('EditTypeParameterBoolComponent', () => {
  let component: EditTypeParameterBoolComponent;
  let fixture: ComponentFixture<EditTypeParameterBoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterBoolComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterImageComponent } from './edit-type-parameter-image.component';

describe('EditTypeParameterImageComponent', () => {
  let component: EditTypeParameterImageComponent;
  let fixture: ComponentFixture<EditTypeParameterImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterImageComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

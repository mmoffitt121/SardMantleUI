import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeParameterDocumentComponent } from './edit-type-parameter-document.component';

describe('EditTypeParameterDocumentComponent', () => {
  let component: EditTypeParameterDocumentComponent;
  let fixture: ComponentFixture<EditTypeParameterDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeParameterDocumentComponent]
    });
    fixture = TestBed.createComponent(EditTypeParameterDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

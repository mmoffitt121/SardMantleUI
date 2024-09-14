import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamBooleanComponent } from './presentation-param-boolean.component';

describe('PresentationParamBooleanComponent', () => {
  let component: PresentationParamBooleanComponent;
  let fixture: ComponentFixture<PresentationParamBooleanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamBooleanComponent]
    });
    fixture = TestBed.createComponent(PresentationParamBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

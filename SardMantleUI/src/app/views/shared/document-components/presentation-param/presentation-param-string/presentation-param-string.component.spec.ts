import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamStringComponent } from './presentation-param-string.component';

describe('PresentationParamStringComponent', () => {
  let component: PresentationParamStringComponent;
  let fixture: ComponentFixture<PresentationParamStringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamStringComponent]
    });
    fixture = TestBed.createComponent(PresentationParamStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

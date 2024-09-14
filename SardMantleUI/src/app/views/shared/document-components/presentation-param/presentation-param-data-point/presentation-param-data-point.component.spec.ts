import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamDataPointComponent } from './presentation-param-data-point.component';

describe('PresentationParamDataPointComponent', () => {
  let component: PresentationParamDataPointComponent;
  let fixture: ComponentFixture<PresentationParamDataPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamDataPointComponent]
    });
    fixture = TestBed.createComponent(PresentationParamDataPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

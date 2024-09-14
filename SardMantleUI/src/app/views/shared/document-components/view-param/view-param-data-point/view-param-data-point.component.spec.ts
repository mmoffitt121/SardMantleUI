import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParamDataPointComponent } from './view-param-data-point.component';

describe('ViewParamDataPointComponent', () => {
  let component: ViewParamDataPointComponent;
  let fixture: ComponentFixture<ViewParamDataPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParamDataPointComponent]
    });
    fixture = TestBed.createComponent(ViewParamDataPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

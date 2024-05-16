import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParamBooleanComponent } from './view-param-boolean.component';

describe('ViewParamBooleanComponent', () => {
  let component: ViewParamBooleanComponent;
  let fixture: ComponentFixture<ViewParamBooleanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParamBooleanComponent]
    });
    fixture = TestBed.createComponent(ViewParamBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

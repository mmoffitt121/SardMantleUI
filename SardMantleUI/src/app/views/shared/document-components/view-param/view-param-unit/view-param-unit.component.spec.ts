import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParamUnitComponent } from './view-param-unit.component';

describe('ViewParamUnitComponent', () => {
  let component: ViewParamUnitComponent;
  let fixture: ComponentFixture<ViewParamUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParamUnitComponent]
    });
    fixture = TestBed.createComponent(ViewParamUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

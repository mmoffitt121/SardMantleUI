import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParamDateComponent } from './view-param-date.component';

describe('ViewParamDateComponent', () => {
  let component: ViewParamDateComponent;
  let fixture: ComponentFixture<ViewParamDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParamDateComponent]
    });
    fixture = TestBed.createComponent(ViewParamDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

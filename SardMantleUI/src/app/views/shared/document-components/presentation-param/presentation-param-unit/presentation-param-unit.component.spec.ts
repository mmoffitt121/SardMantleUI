import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamUnitComponent } from './presentation-param-unit.component';

describe('PresentationParamUnitComponent', () => {
  let component: PresentationParamUnitComponent;
  let fixture: ComponentFixture<PresentationParamUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamUnitComponent]
    });
    fixture = TestBed.createComponent(PresentationParamUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

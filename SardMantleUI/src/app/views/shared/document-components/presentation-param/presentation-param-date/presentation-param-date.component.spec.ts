import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamDateComponent } from './presentation-param-date.component';

describe('PresentationParamDateComponent', () => {
  let component: PresentationParamDateComponent;
  let fixture: ComponentFixture<PresentationParamDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamDateComponent]
    });
    fixture = TestBed.createComponent(PresentationParamDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

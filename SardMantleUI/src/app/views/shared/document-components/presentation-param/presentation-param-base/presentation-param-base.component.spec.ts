import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamBaseComponent } from './presentation-param-base.component';

describe('PresentationParamBaseComponent', () => {
  let component: PresentationParamBaseComponent;
  let fixture: ComponentFixture<PresentationParamBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamBaseComponent]
    });
    fixture = TestBed.createComponent(PresentationParamBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

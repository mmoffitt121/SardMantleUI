import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamComponent } from './presentation-param.component';

describe('PresentationParamComponent', () => {
  let component: PresentationParamComponent;
  let fixture: ComponentFixture<PresentationParamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamComponent]
    });
    fixture = TestBed.createComponent(PresentationParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

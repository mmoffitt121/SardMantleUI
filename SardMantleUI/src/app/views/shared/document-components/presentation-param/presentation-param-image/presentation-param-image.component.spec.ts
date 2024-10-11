import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamImageComponent } from './presentation-param-image.component';

describe('PresentationParamImageComponent', () => {
  let component: PresentationParamImageComponent;
  let fixture: ComponentFixture<PresentationParamImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamImageComponent]
    });
    fixture = TestBed.createComponent(PresentationParamImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

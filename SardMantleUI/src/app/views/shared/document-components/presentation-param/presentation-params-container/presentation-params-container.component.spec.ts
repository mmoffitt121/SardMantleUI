import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationParamsContainerComponent } from './presentation-params-container.component';

describe('PresentationParamsContainerComponent', () => {
  let component: PresentationParamsContainerComponent;
  let fixture: ComponentFixture<PresentationParamsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationParamsContainerComponent]
    });
    fixture = TestBed.createComponent(PresentationParamsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalHomeComponent } from './global-home.component';

describe('GlobalHomeComponent', () => {
  let component: GlobalHomeComponent;
  let fixture: ComponentFixture<GlobalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalHomeComponent]
    });
    fixture = TestBed.createComponent(GlobalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

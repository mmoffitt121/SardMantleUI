import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBrowserComponent } from './world-browser.component';

describe('WorldBrowserComponent', () => {
  let component: WorldBrowserComponent;
  let fixture: ComponentFixture<WorldBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldBrowserComponent]
    });
    fixture = TestBed.createComponent(WorldBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

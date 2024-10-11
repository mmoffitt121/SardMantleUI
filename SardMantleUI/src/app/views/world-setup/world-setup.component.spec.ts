import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldSetupComponent } from './world-setup.component';

describe('WorldSetupComponent', () => {
  let component: WorldSetupComponent;
  let fixture: ComponentFixture<WorldSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldSetupComponent]
    });
    fixture = TestBed.createComponent(WorldSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldImportComponent } from './world-import.component';

describe('WorldImportComponent', () => {
  let component: WorldImportComponent;
  let fixture: ComponentFixture<WorldImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldImportComponent]
    });
    fixture = TestBed.createComponent(WorldImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

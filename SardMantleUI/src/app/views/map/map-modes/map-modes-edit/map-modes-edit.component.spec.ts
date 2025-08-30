import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModesEditComponent } from './map-modes-edit.component';

describe('MapModesEditComponent', () => {
  let component: MapModesEditComponent;
  let fixture: ComponentFixture<MapModesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapModesEditComponent]
    });
    fixture = TestBed.createComponent(MapModesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModesComponent } from './map-modes.component';

describe('MapModesComponent', () => {
  let component: MapModesComponent;
  let fixture: ComponentFixture<MapModesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapModesComponent]
    });
    fixture = TestBed.createComponent(MapModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

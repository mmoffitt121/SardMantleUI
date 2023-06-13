import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditWindowComponent } from './map-edit-window.component';

describe('MapEditWindowComponent', () => {
  let component: MapEditWindowComponent;
  let fixture: ComponentFixture<MapEditWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapEditWindowComponent]
    });
    fixture = TestBed.createComponent(MapEditWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

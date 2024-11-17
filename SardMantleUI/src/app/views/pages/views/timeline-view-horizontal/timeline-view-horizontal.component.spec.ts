import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineViewHorizontalComponent } from './timeline-view-horizontal.component';

describe('TimelineViewHorizontalComponent', () => {
  let component: TimelineViewHorizontalComponent;
  let fixture: ComponentFixture<TimelineViewHorizontalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineViewHorizontalComponent]
    });
    fixture = TestBed.createComponent(TimelineViewHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

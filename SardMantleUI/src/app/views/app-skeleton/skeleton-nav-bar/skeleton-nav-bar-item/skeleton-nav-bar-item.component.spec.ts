import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonNavBarItemComponent } from './skeleton-nav-bar-item.component';

describe('SkeletonNavBarItemComponent', () => {
  let component: SkeletonNavBarItemComponent;
  let fixture: ComponentFixture<SkeletonNavBarItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonNavBarItemComponent]
    });
    fixture = TestBed.createComponent(SkeletonNavBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

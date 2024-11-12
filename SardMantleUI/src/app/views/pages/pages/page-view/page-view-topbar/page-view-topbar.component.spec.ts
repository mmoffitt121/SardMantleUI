import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewTopbarComponent } from './page-view-topbar.component';

describe('PageViewTopbarComponent', () => {
  let component: PageViewTopbarComponent;
  let fixture: ComponentFixture<PageViewTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewTopbarComponent]
    });
    fixture = TestBed.createComponent(PageViewTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

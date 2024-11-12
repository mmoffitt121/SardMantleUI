import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementBaseComponent } from './page-view-element-base.component';

describe('PageViewElementBaseComponent', () => {
  let component: PageViewElementBaseComponent;
  let fixture: ComponentFixture<PageViewElementBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementBaseComponent]
    });
    fixture = TestBed.createComponent(PageViewElementBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

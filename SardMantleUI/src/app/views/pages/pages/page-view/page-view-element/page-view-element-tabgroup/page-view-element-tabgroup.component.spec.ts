import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementTabgroupComponent } from './page-view-element-tabgroup.component';

describe('PageViewElementTabgroupComponent', () => {
  let component: PageViewElementTabgroupComponent;
  let fixture: ComponentFixture<PageViewElementTabgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementTabgroupComponent]
    });
    fixture = TestBed.createComponent(PageViewElementTabgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

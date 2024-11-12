import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementSplitcontainerComponent } from './page-view-element-splitcontainer.component';

describe('PageViewElementSplitcontainerComponent', () => {
  let component: PageViewElementSplitcontainerComponent;
  let fixture: ComponentFixture<PageViewElementSplitcontainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementSplitcontainerComponent]
    });
    fixture = TestBed.createComponent(PageViewElementSplitcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

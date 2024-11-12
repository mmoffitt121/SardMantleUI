import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementDirectoryComponent } from './page-view-element-directory.component';

describe('PageViewElementDirectoryComponent', () => {
  let component: PageViewElementDirectoryComponent;
  let fixture: ComponentFixture<PageViewElementDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementDirectoryComponent]
    });
    fixture = TestBed.createComponent(PageViewElementDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

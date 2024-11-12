import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementDocumentComponent } from './page-view-element-document.component';

describe('PageViewElementDocumentComponent', () => {
  let component: PageViewElementDocumentComponent;
  let fixture: ComponentFixture<PageViewElementDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementDocumentComponent]
    });
    fixture = TestBed.createComponent(PageViewElementDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

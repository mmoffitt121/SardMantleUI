import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementComponent } from './page-view-element.component';

describe('PageViewElementComponent', () => {
  let component: PageViewElementComponent;
  let fixture: ComponentFixture<PageViewElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementComponent]
    });
    fixture = TestBed.createComponent(PageViewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewElementEditorComponent } from './page-view-element-editor.component';

describe('PageViewElementEditorComponent', () => {
  let component: PageViewElementEditorComponent;
  let fixture: ComponentFixture<PageViewElementEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageViewElementEditorComponent]
    });
    fixture = TestBed.createComponent(PageViewElementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPresentationComponent } from './document-presentation.component';

describe('DocumentPresentationComponent', () => {
  let component: DocumentPresentationComponent;
  let fixture: ComponentFixture<DocumentPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPresentationComponent]
    });
    fixture = TestBed.createComponent(DocumentPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

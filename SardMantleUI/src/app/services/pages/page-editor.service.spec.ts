import { TestBed } from '@angular/core/testing';

import { PageEditorService } from './page-editor.service';

describe('PageEditorService', () => {
  let service: PageEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

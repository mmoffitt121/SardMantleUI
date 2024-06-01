import { TestBed } from '@angular/core/testing';

import { DocumentIoService } from './document-io.service';

describe('DocumentIoService', () => {
  let service: DocumentIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

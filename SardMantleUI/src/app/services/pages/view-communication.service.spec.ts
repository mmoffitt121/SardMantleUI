import { TestBed } from '@angular/core/testing';

import { ViewCommunicationService } from './view-communication.service';

describe('ViewCommunicationService', () => {
  let service: ViewCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

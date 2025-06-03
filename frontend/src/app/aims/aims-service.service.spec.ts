import { TestBed } from '@angular/core/testing';

import { AimsServiceService } from './aims-service.service';

describe('AimsServiceService', () => {
  let service: AimsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AimsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

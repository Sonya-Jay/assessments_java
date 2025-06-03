import { TestBed } from '@angular/core/testing';

import { UricaServiceService } from './urica-service.service';

describe('UricaServiceService', () => {
  let service: UricaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UricaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

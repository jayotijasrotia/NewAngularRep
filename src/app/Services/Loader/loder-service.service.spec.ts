import { TestBed } from '@angular/core/testing';

import { LoderServiceService } from './loder-service.service';

describe('LoderServiceService', () => {
  let service: LoderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

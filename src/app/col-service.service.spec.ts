import { TestBed } from '@angular/core/testing';

import { ColServiceService } from './col-service.service';

describe('ColServiceService', () => {
  let service: ColServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

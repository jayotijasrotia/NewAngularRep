import { TestBed } from '@angular/core/testing';

import { SelectColumnsService } from './select-columns.service';

describe('SelectColumnsService', () => {
  let service: SelectColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

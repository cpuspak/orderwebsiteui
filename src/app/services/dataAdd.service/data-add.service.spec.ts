import { TestBed } from '@angular/core/testing';

import { DataAddService } from './data-add.service';

describe('DataAddService', () => {
  let service: DataAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

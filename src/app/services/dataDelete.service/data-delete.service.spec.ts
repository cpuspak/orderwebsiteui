import { TestBed } from '@angular/core/testing';

import { DataDeleteService } from './data-delete.service';

describe('DataDeleteService', () => {
  let service: DataDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TaxRecordService } from './taxrecord-service';

describe('TaxrecordService', () => {
  let service: TaxRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

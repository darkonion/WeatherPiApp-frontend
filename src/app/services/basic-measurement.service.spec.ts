import { TestBed } from '@angular/core/testing';

import { BasicMeasurementService } from './basic-measurement.service';

describe('BasicMeasurementService', () => {
  let service: BasicMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

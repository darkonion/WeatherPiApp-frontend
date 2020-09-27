import { TestBed } from '@angular/core/testing';

import { AirMeasurementService } from './air-measurement.service';

describe('AirMeasurementService', () => {
  let service: AirMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

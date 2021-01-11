import { TestBed } from '@angular/core/testing';

import { AirlyService } from './airly.service';

describe('AirlyService', () => {
  let service: AirlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

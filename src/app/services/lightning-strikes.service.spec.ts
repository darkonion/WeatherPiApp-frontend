import { TestBed } from '@angular/core/testing';

import { LightningStrikesService } from './lightning-strikes.service';

describe('LightningStrikesService', () => {
  let service: LightningStrikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightningStrikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { JwtCountdownService } from './jwt-countdown.service';

describe('JwtCountdownService', () => {
  let service: JwtCountdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtCountdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

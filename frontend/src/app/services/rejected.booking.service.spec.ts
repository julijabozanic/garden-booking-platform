import { TestBed } from '@angular/core/testing';

import { RejectedBookingService } from './rejected.booking.service';

describe('RejectedBookingService', () => {
  let service: RejectedBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

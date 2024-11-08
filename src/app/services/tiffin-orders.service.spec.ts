import { TestBed } from '@angular/core/testing';

import { TiffinOrdersService } from './tiffin-orders.service';

describe('TiffinOrdersService', () => {
  let service: TiffinOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiffinOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

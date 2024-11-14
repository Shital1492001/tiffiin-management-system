import { TestBed } from '@angular/core/testing';

import { AdminApprovalRightsService } from './admin-approval-rights.service';

describe('AdminApprovalRightsService', () => {
  let service: AdminApprovalRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApprovalRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

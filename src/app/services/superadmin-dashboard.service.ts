import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashboardService {
  totalAdmins = {
    approved: 180,
    rejected: 40,
    pending: 108,
  };

  constructor() {}

  getTotalAdmins() {
    return of(this.totalAdmins);
  }
}

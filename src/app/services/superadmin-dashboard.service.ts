import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashboardService {
  adminsData = [
    { month: 'January', approved: 5, rejected: 2, pending: 3 },
    { month: 'February', approved: 6, rejected: 1, pending: 2 },
    { month: 'March', approved: 7, rejected: 3, pending: 4 },
    { month: 'April', approved: 8, rejected: 2, pending: 5 },
    { month: 'May', approved: 10, rejected: 1, pending: 7 },
    { month: 'June', approved: 12, rejected: 3, pending: 8 },
    { month: 'July', approved: 15, rejected: 4, pending: 10 },
    { month: 'August', approved: 20, rejected: 2, pending: 12 },
    { month: 'September', approved: 18, rejected: 3, pending: 10 },
    { month: 'October', approved: 22, rejected: 1, pending: 12 },
    { month: 'November', approved: 25, rejected: 2, pending: 15 },
    { month: 'December', approved: 30, rejected: 5, pending: 20 },
  ];

  totalAdmins = {
    approved: 180,
    rejected: 40,
    pending: 108,
  };

  constructor() {}

  getAdminsData() {
    return of(this.adminsData);
  }

  getTotalAdmins() {
    return of(this.totalAdmins);
  }
}

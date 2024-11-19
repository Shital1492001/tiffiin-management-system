import { Component, OnInit } from '@angular/core';
import { SuperadminDashboardService } from '../../services/superadmin-dashboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Admin } from '../../models/admin';
import { InfoChartsComponent } from '../info-charts/info-charts.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    NgApexchartsModule,
    InfoChartsComponent,
  ],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css'],
})
export class SuperadminDashboardComponent implements OnInit {
  approvedAdmins = 0;
  pendingAdmins = 0;
  rejectedAdmins = 0;
  role = 'superadmin';

  constructor(
    private authService: AuthService,
    private superadminService: SuperadminDashboardService
  ) {}

  userStatus: string | null = null;
  getUserByToken() {
    const userByToken = this.authService.getUserTypeByToken();
    userByToken.subscribe({
      next: (userData) => {
        console.log('userdata', userData);
        this.userStatus = userData.data.role_specific_details.approval_status;
      },
      error: () => {},
    });
  }

  ngOnInit(): void {
    this.getUserByToken();
    this.getPendingCount();
    this.getApprovedCount();
    this.getRejectCount();
  }
  getPendingCount() {
    this.superadminService.getRequestsByStatus('pending', 1, 5).subscribe({
      next: (response) => {
        this.pendingAdmins = response.pagination.totalItems;
        console.log('pendingAdmins', this.pendingAdmins);
      },
    });
  }

  getApprovedCount() {
    this.superadminService.getRequestsByStatus('approved', 1, 5).subscribe({
      next: (response) => {
        this.approvedAdmins = response.pagination.totalItems;
        console.log('approvedAdmins', this.approvedAdmins);
      },
    });
  }
  getRejectCount() {
    this.superadminService.getRequestsByStatus('rejected', 1, 5).subscribe({
      next: (response) => {
        this.rejectedAdmins = response.pagination.totalItems;
        console.log('rejectedAdmins', this.rejectedAdmins);
      },
    });
  }
}

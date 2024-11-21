import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RejectedAdminViewComponent } from '../rejected-admin-view/rejected-admin-view.component';
import { PendingAdminViewComponent } from '../pending-admin-view/pending-admin-view.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { InfoChartsComponent } from '../../info-charts/info-charts.component';
import { AdminApprovalRightsService } from '../../../services/admin-approval-rights.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    RejectedAdminViewComponent,
    PendingAdminViewComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    InfoChartsComponent,
    NgApexchartsModule,
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css',
})
export class AdminViewComponent {
  totalPendingRetailerCount = 45;
  totalApprovedRetailerCount = 55;
  totalRejectedRetailerCount = 22;
  role = 'admin';
  constructor(
    private authService: AuthService,
    private adminRightsServices: AdminApprovalRightsService
  ) { }

  userStatus: string | null = null;
  getUserByToken() {
    const userByToken = this.authService.getUserTypeByToken();
    userByToken.subscribe({
      next: (userData) => {
        this.userStatus = userData.data.role_specific_details.approval_status;
      },
      error: () => { },
    });
  }

  ngOnInit(): void {
    this.getUserByToken();
    this.getAllApprovedRetailers();
    this.getAllPendingRetailers();
    this.getAllRejectedRetailers();
  }
  getAllPendingRetailers() {
    this.adminRightsServices.getRequestsByStatus('pending', 1, 1).subscribe({
      next: (response) => {
        console.log('pending', response.data);

        this.totalPendingRetailerCount = response.pagination.totalItems;
      },
    });
  }

  getAllApprovedRetailers() {
    console.log('approved',);

    this.adminRightsServices.getRequestsByStatus('approved', 1, 1).subscribe({
      next: (response) => {
        console.log('approved', response.data);

        this.totalApprovedRetailerCount = response.pagination.totalItems;
      },
    });
  }

  getAllRejectedRetailers() {
    this.adminRightsServices.getRequestsByStatus('rejected', 1, 1).subscribe({
      next: (response) => {
        console.log('rejected', response.data);
        this.totalRejectedRetailerCount = response.pagination.totalItems;
      },
    });
  }
}

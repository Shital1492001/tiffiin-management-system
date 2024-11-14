import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminApprovalRightsService } from '../../services/admin-approval-rights.service';
import { Admin } from '../../models/admin';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RetailerCardComponent } from '../retailer-card/retailer-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-approval-rights.component.html',
  styleUrls: ['./admin-approval-rights.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RetailerCardComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  approvedRetailers: Admin[] = [];
  pendingRetailers: Admin[] = [];
  rejectedRetailers: Admin[] = [];
  allRetailers: Admin[] = [];
  constructor(
    private adminService: AdminApprovalRightsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('in admin rights');

    // this.fetchAllRetailers();
    // this.getAllApprovedRetailers();
    // this.loadPendingRequests();
    // this.getAllRejectedRetailers();
    this.getAllRetailers('pending');
  }

  loadPendingRequests(): void {
    this.adminService.getPendingRequests().subscribe(
      (response) => {
        this.pendingRetailers = response.data;
        console.log('pending retailers:', this.pendingRetailers);
      },
      (error) => {
        console.error('Error fetching pending requests:', error);
      }
    );
  }

  getAllApprovedRetailers() {
    console.log('inside approved retailers...');

    this.adminService.getApprovedRequests().subscribe({
      next: (response) => {
        this.approvedRetailers = response.data;
        console.log('Approved retailers data:', this.approvedRetailers);
      },
      error: (err) => {
        console.error('Error fetching approved retailers', err);
        this.approvedRetailers = [];
      },
    });
  }

  getAllRejectedRetailers() {
    this.adminService.getRejectedRequests().subscribe({
      next: (response) => {
        this.rejectedRetailers = response.data;
        console.log('Rejected retailers data: ', this.rejectedRetailers);
      },
      error: (err) => {
        console.error('Error fetching rejected retailers', err);
      },
    });
  }

  fetchAllRetailers() {
    const approved = this.adminService.getApprovedRequests();
    const rejected = this.adminService.getRejectedRequests();
    const pending = this.adminService.getPendingRequests();

    forkJoin([approved, rejected, pending]).subscribe(
      ([approved, rejected, pending]) => {
        this.allRetailers = [
          ...approved.data.map((retailer: Admin) => ({
            ...retailer,
            role_specific_details: {
              ...retailer.role_specific_details,
              approval_status: retailer.role_specific_details
                ?.approval_status || [{ approval_status: 'approved' }],
            },
          })),
          ...rejected.data.map((retailer: Admin) => ({
            ...retailer,
            role_specific_details: {
              ...retailer.role_specific_details,
              approval_status: retailer.role_specific_details
                ?.approval_status || [{ approval_status: 'rejected' }],
            },
          })),
          ...pending.data.map((retailer: Admin) => ({
            ...retailer,
            role_specific_details: {
              ...retailer.role_specific_details,
              approval_status: retailer.role_specific_details
                ?.approval_status || [{ approval_status: 'pending' }],
            },
          })),
        ];

        console.log('all retailers...', this.allRetailers);
      }
    );
  }

  getAllRetailers(status: string) {
    console.log('Fetching admin requests for status:', status);
    this.adminService.getRequestsByStatus(status).subscribe({
      next: (adminData) => {
        this.allRetailers = adminData.data;
        console.log('Fetched Admin Requests:', this.allRetailers);
      },
      error: (err) => {
        console.error('Error fetching admin requests:', err);
      },
    });
  }

  updateStatusAprroved(id: string) {
    const approvedObservable = this.adminService.approveRetailer(id);
    approvedObservable.subscribe({
      next: (obj) => {
        console.log('obj.....', obj);
        this.openDialog(
          'Approval Successful',
          'The retailer has been approved successfully!'
        );
        this.router.navigate(['status']);
      },
      error: (err) => {
        console.log(err);
        window.alert('something went wrong while updating status...');
      },
    });
  }

  updateStatusRejected(id: string) {
    const rejectedObservable = this.adminService.rejectRetailer(id);
    rejectedObservable.subscribe({
      next: (response) => {
        console.log('response for reject', response);

        this.openDialog(
          'Reject Successful',
          'The retailer has been rejected successfully!'
        );
        this.router.navigate(['status']);
      },
    });
  }

  openDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ActionDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
  }
}

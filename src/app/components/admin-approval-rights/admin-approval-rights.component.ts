import { Component, OnInit } from '@angular/core';
import { AdminApprovalRightsService } from '../../services/admin-approval-rights.service';
import { Retailer } from '../../models/retailer';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { StatusTableComponent } from '../status-table/status-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { debounceTime, distinctUntilChanged, forkJoin, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-approval-rights.component.html',
  styleUrls: ['./admin-approval-rights.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    StatusTableComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
  ],
})
export class AdminDashboardComponent implements OnInit {
  approvedRetailers: Retailer[] = [];
  pendingRetailers: Retailer[] = [];
  rejectedRetailers: Retailer[] = [];
  allRetailers: Retailer[] = [];
  retailers: Retailer[] = [];
  currentPage: number = 1;
  limit: number = 100;
  totalItems: number = 14;
  totalPages: number = 0;
  role: string = 'admin';
  status: string = 'approved';
  searchQuery!: string;
  retailerStatus!: string;

  searchParam = {
    query: this.searchQuery,
    approval_status: this.retailerStatus,
  };
  private searchSubject = new Subject<string>();

  selectedOption: string | null = null;
  constructor(
    private adminService: AdminApprovalRightsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.searchSubject
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((query) => {
        this.searchAdminByMultipleEntity(query);
      });
  }

  ngOnInit(): void {
    this.getAllRetailers('pending', this.currentPage, this.limit);
  }

  getAllRetailers(status: string, currentPage: number, limit: number) {
    // console.log('Fetching admin requests for status:', status);
    this.adminService
      .getRequestsByStatus(status, currentPage, limit)
      .subscribe({
        next: (adminData) => {
          //console.log('pagination......', adminData.pagination);

          this.allRetailers = adminData.data;
          this.retailers = adminData.data;

          console.log('Fetched Retailer Requests:', this.allRetailers);
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

  onStatusChange(event: any): void {
    this.status = event.value;
    this.getAllRetailers(this.status, this.currentPage, this.limit);
  }

  openDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ActionDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }
  searchAdminByMultipleEntity(searchQueryOnKeyUp: string) {
    console.log(
      'searchQuery-',
      this.searchQuery,
      'adminStatus-',
      this.retailerStatus
    );
    if (searchQueryOnKeyUp != '') {
      const searchedObservable = this.adminService.searchRetailer(
        searchQueryOnKeyUp,
        this.status
      );
      searchedObservable.subscribe({
        next: (searchRetailer) => {
          if (searchRetailer.data.length) {
            console.log(searchRetailer);
            this.allRetailers = searchRetailer.data;
          } else {
            console.log('Not Found');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.allRetailers = this.retailers;
    }
  }
}

import { Component } from '@angular/core';
import { SuperadminService } from '../../../services/superadmin.service';
import { Admin } from '../../../models/admin';
import { StatusTableComponent } from '../../status-table/status-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from "rxjs";
import { SnackbarService } from '../../../services/snackbar.service';
import { ActionDialogComponent } from '../../action-dialog/action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-request',
  standalone: true,
  imports: [
    StatusTableComponent,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './admin-request.component.html',
  styleUrl: './admin-request.component.css',
})
export class AdminRequestComponent {
  adminsArray: Admin[] = [];
  allAdminsArray: Admin[] = [];
  rejectedAdminsArray: Admin[] = [];
  approvedAdminsArray: Admin[] = [];
  currentPage: number = 1;
  limit: number = 100;
  status: string = 'pending';
  totalItems: number = 14;
  totalPages: number = 0;
  searchQuery!: string;
  adminStatus!: string;
  searchParam = {
    query: this.searchQuery,
    approval_status: this.adminStatus,
  };
  searchedQueryNotFound: string = "";
  searchSubject = new Subject<string>();
  constructor(
    private superAdminService: SuperadminService,
    private router: Router,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {
    this.searchSubject.pipe(debounceTime(1500), distinctUntilChanged()).subscribe((query) => {
      this.searchAdminByMultipleEntity(query);
    });
  }
  ngOnInit(): void {
    this.getAdminRequestsByStatus('pending', this.currentPage, this.limit);
  }

  getAdminRequestsByStatus(
    status: string,
    currentPage: number,
    limit: number
  ): void {
    console.log('Fetching admin requests for status:', status);
    this.superAdminService
      .getRequestsByStatus(status, currentPage, limit)
      .subscribe({
        next: (adminData) => {
          this.adminsArray = adminData.data;
          this.allAdminsArray = adminData.data;
          this.totalItems = adminData.pagination.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.limit);
          console.log('Fetched Admin Requests:', this.adminsArray);
          console.log('Total Pages:', this.totalPages);
        },
        error: (err) => {
          console.error('Error fetching admin requests:', err);
        },
      });
  }


  updateStatusAprroved(id: string) {
    const approvedObservable = this.superAdminService.approveAdminById(id);
    approvedObservable.subscribe({
      next: (obj) => {
        console.log(obj);
        this.getAdminRequestsByStatus(this.status, this.currentPage, this.limit);
      },
      error: (err) => {
        console.log(err);

      },
    });
  }

  updateStatusRejected(id: string) {
    const approvedObservable = this.superAdminService.rejectAdminById(id);
    approvedObservable.subscribe({
      next: (obj) => {
        console.log(obj);
        this.getAdminRequestsByStatus(this.status, this.currentPage, this.limit);
      },
      error: (err) => {
        console.log(err);
        window.alert('something went wrong while updating status...');
      },
    });
  }
  onStatusChange(event: any): void {
    this.status = event.value;
    this.adminStatus = event.value;
    this.currentPage = 1;
    this.getAdminRequestsByStatus(this.status, this.currentPage, this.limit);
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
      this.adminStatus
    );
    if (searchQueryOnKeyUp != '') {
      const searchedObservable = this.superAdminService.searchAdmin(
        searchQueryOnKeyUp,
        this.status
      );
      searchedObservable.subscribe({
        next: (searchedAdmin) => {
          if (searchedAdmin.data.length) {
            console.log(searchedAdmin);
            this.adminsArray = searchedAdmin.data;
          } else {
            console.log('Not Found');
          }
        },
        error: (err) => {
          console.log(err);
          // this.snackbar.showError(`no admin with ${searchQueryOnKeyUp} found in ${this.status} admins`)
          this.adminsArray = []
          this.searchedQueryNotFound = searchQueryOnKeyUp
        },
      });
    } else {
      this.adminsArray = this.allAdminsArray;
    }
  }
}




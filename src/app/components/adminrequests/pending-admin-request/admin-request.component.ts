import { Component } from '@angular/core';
import { SuperadminService } from '../../../services/superadmin.service';
import { admin } from '../../../models/admin';
import { StatusTableComponent } from '../../status-table/status-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-request',
  standalone: true,
  imports: [StatusTableComponent, MatTabsModule, MatButtonToggleModule],
  templateUrl: './admin-request.component.html',
  styleUrl: './admin-request.component.css',
})
export class AdminRequestComponent {
  adminsArray: admin[] = [];
  rejectedAdminsArray: admin[] = [];
  approvedAdminsArray: admin[] = [];

  constructor(
    private superAdminService: SuperadminService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAdminRequestsByStatus('pending');
  }

  getAdminRequestsByStatus(status: string): void {
    console.log('Fetching admin requests for status:', status);
    this.superAdminService.getRequestsByStatus(status).subscribe({
      next: (adminData) => {
        this.adminsArray = adminData.data;
        console.log('Fetched Admin Requests:', this.adminsArray);
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
        window.alert(`Admin with id ${id} is approved successfully`);
        this.router.navigate(['statusDataTable']);
      },
      error: (err) => {
        console.log(err);
        window.alert('something went wrong while updating status...');
      },
    });
  }

  updateStatusRejected(id: string) {
    const approvedObservable = this.superAdminService.rejectAdminById(id);
    approvedObservable.subscribe({
      next: (obj) => {
        console.log(obj);
        window.alert(`are you sure you want reject admin with ${id}`);
        this.router.navigate(['statusDataTable']);
      },
      error: (err) => {
        console.log(err);
        window.alert('something went wrong while updating status...');
      },
    });
  }

  onStatusChange(event: any): void {
    const selectedStatus = event.value;
    console.log(selectedStatus);
    this.getAdminRequestsByStatus(selectedStatus);
  }
}

import { Component } from '@angular/core';
import { SuperadminService } from '../../../services/superadmin.service';
import { admin } from '../../../models/admin';
import { StatusTableComponent } from '../../status-table/status-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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

  constructor(private superAdminService: SuperadminService) {}
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

  onStatusChange(event: any): void {
    const selectedStatus = event.value;
    console.log(selectedStatus);

    this.getAdminRequestsByStatus(selectedStatus);
  }
}

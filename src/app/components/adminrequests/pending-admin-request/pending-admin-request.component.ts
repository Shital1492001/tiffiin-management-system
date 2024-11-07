import { Component } from '@angular/core';
import { SuperadminService } from '../../../services/superadmin.service';
import { admin } from '../../../models/admin';
import { StatusTableComponent } from '../../status-table/status-table.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-pending-admin-request',
  standalone: true,
  imports: [StatusTableComponent, MatTabsModule],
  templateUrl: './pending-admin-request.component.html',
  styleUrl: './pending-admin-request.component.css',
})
export class PendingAdminRequestComponent {
  pendingAdminsArray: admin[] = [];
  rejectedAdminsArray: admin[] = [];
  approvedAdminsArray: admin[] = [];

  // enum status{
  //   pending,
  //   reject,
  //   approved
  // }

  constructor(private superAdminService: SuperadminService) {}
  ngOnInit(): void {
    this.getAllpendingAdmins();
    // this.getAllRejectedAdmins();
    // this.getAllApprovedAdmins();
  }
  getAllpendingAdmins() {
    console.log('inside getAllpendingAdmins');
    const pendingAdminObservable = this.superAdminService.getPendingRequests();
    pendingAdminObservable.subscribe({
      next: (adminData) => {
        this.pendingAdminsArray = adminData.data;
        console.log('pendingAdminsArray', this.pendingAdminsArray);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /*
  getAllRejectedAdmins() {
    console.log('inside getAllRejectedAdmins');
    const rejectedAdminObservable =
      this.superAdminService.getRejectedRequests();
    rejectedAdminObservable.subscribe({
      next: (adminData) => {
        this.rejectedAdminsArray = adminData.data;
        console.log('RejectedAdmins', this.rejectedAdminsArray);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllApprovedAdmins() {
    console.log('inside getAllApprovedAdmins');
    const approvedAdminObservable =
      this.superAdminService.getApprovedRequests();
    approvedAdminObservable.subscribe({
      next: (adminData) => {
        this.approvedAdminsArray = adminData.data;
        console.log('ApprovedAdmins', this.approvedAdminsArray);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
    */
}

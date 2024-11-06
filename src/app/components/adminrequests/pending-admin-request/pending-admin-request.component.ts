import { Component } from '@angular/core';
import { SuperadminService } from '../../../services/superadmin.service';
import { admin } from '../../../models/admin';
import { StatusTableComponent } from '../../status-table/status-table.component';

@Component({
  selector: 'app-pending-admin-request',
  standalone: true,
  imports: [StatusTableComponent],
  templateUrl: './pending-admin-request.component.html',
  styleUrl: './pending-admin-request.component.css',
})
export class PendingAdminRequestComponent {
  pendingAdminsArray: admin[] = [];
  constructor(private superAdminService: SuperadminService) {}
  ngOnInit(): void {
    this.getAllpendingAdmins();
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
}

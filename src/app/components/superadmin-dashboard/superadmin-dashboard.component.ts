import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SuperadminDashboardService } from '../../services/superadmin-dashboard.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrl: './superadmin-dashboard.component.css',
})
export class SuperadminDashboardComponent implements OnInit {
  monthlyAdmins: any[] = [];
  totalAdmins: any = { approved: 0, rejected: 0, pending: 0 };

  constructor(private superadminService: SuperadminDashboardService) {}

  ngOnInit(): void {
    this.superadminService.getAdminsData().subscribe((data) => {
      this.monthlyAdmins = data;
    });

    this.superadminService.getTotalAdmins().subscribe((data) => {
      this.totalAdmins = data;
    });
  }
}

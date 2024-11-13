import { Component, OnInit } from '@angular/core';
import { SuperadminDashboardService } from '../../services/superadmin-dashboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css'],
})
export class SuperadminDashboardComponent implements OnInit {
  monthlyAdmins: any[] = [];
  months: string[] = [];
  totalAdmins: any = { approved: 0, rejected: 0, pending: 0 };
  tableData: any[] = [
    { category: 'Approved' },
    { category: 'Rejected' },
    { category: 'Pending' },
  ];

  displayedColumns: string[] = ['category'];

  constructor(private superadminService: SuperadminDashboardService) {}

  ngOnInit(): void {
    this.getAllAdminsData();
    this.getAllAdmins();
  }

  getAllAdminsData() {
    this.superadminService.getAdminsData().subscribe((data) => {
      this.monthlyAdmins = data;

      this.months = this.monthlyAdmins.map((item) => item.month);
      this.displayedColumns = ['category', ...this.months];

      this.monthlyAdmins.forEach((item) => {
        this.tableData[0][item.month] = item.approved;
        this.tableData[1][item.month] = item.rejected;
        this.tableData[2][item.month] = item.pending;
      });
    });
  }

  getAllAdmins() {
    this.superadminService.getTotalAdmins().subscribe((data) => {
      this.totalAdmins = data;
    });
  }
}

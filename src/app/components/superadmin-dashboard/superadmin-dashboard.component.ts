import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TiffinOrdersService } from '../../services/tiffin-orders.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrl: './superadmin-dashboard.component.css',
})
export class SuperadminDashboardComponent implements OnInit {
  pendingCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;

  // monthlyOrders: any[] = [];
  monthlyAdmins: any[] = [];
  totalAdmins: any = { approved: 0, rejected: 0, pending: 0 };

  constructor(private tiffinOrdersService: TiffinOrdersService) {}

  // ngOnInit(): void {}

  // getTotalOrders(): number {
  //   return this.monthlyOrders.reduce((total, order) => total + order.orders, 0);
  // }

  // public ordersData = [
  //   { month: 'January', orders: 120 },
  //   { month: 'February', orders: 135 },
  //   { month: 'March', orders: 150 },
  //   { month: 'April', orders: 145 },
  //   { month: 'May', orders: 160 },
  //   { month: 'June', orders: 180 },
  //   { month: 'July', orders: 200 },
  //   { month: 'August', orders: 215 },
  //   { month: 'September', orders: 220 },
  //   { month: 'October', orders: 250 },
  //   { month: 'November', orders: 240 },
  //   { month: 'December', orders: 230 },
  // ];

  // totalMonthlyOrders: number = 0;
  // totalYearlyOrders: number = 0;

  // constructor() {}

  // ngOnInit(): void {
  //   this.getTiffinOrders().subscribe((data) => {
  //     this.processOrderData(data);
  //   });
  // }

  // getTiffinOrders() {
  //   return of(this.ordersData);
  // }

  // processOrderData(data: any[]): void {
  //   this.totalMonthlyOrders = data.reduce(
  //     (sum, order) => sum + order.orders,
  //     0
  //   );

  //   this.totalYearlyOrders = this.totalMonthlyOrders;
  // }

  ngOnInit(): void {
    this.tiffinOrdersService.getAdminsData().subscribe((data) => {
      this.monthlyAdmins = data;
    });

    this.tiffinOrdersService.getTotalAdmins().subscribe((data) => {
      this.totalAdmins = data;
    });
  }
}

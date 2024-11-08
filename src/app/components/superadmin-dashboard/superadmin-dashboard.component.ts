import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TiffinOrdersService } from '../../services/tiffin-orders.service';
import { CommonModule } from '@angular/common';

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

  monthlyOrders: any[] = [];

  constructor(private tiffinOrdersService: TiffinOrdersService) {}

  ngOnInit(): void {}

  getTotalOrders(): number {
    return this.monthlyOrders.reduce((total, order) => total + order.orders, 0);
  }
}

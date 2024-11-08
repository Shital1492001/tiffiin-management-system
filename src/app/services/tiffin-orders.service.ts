import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiffinOrdersService {
  private ordersData = [
    { month: 'January', orders: 120 },
    { month: 'February', orders: 135 },
    { month: 'March', orders: 150 },
    { month: 'April', orders: 145 },
    { month: 'May', orders: 160 },
    { month: 'June', orders: 180 },
    { month: 'July', orders: 200 },
    { month: 'August', orders: 215 },
    { month: 'September', orders: 220 },
    { month: 'October', orders: 250 },
    { month: 'November', orders: 240 },
    { month: 'December', orders: 230 },
  ];

  constructor() {}

  getTiffinOrders() {
    return of(this.ordersData);
  }
}

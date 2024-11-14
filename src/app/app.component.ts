import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin-approval-rights/admin-approval-rights.component';
import { RetailerCardComponent } from './components/retailer-card/retailer-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, AdminDashboardComponent, RetailerCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tiffin_Management_System';
}

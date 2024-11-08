import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusTableComponent } from './components/status-table/status-table.component';
import { AdminRequestComponent } from './components/adminrequests/pending-admin-request/admin-request.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatusTableComponent, AdminRequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tiffin_Management_System';
}

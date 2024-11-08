import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { StatusTableComponent } from './components/status-table/status-table.component';
import { AdminRequestComponent } from './components/adminrequests/pending-admin-request/admin-request.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatusTableComponent, AdminRequestComponent],
=======
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
>>>>>>> a90cb69a21c77d483cd3a548c558132ba8c1094c
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tiffin_Management_System';
}

import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Menus } from '../../models/menus';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menus: Menus[] = [
    {
      label: `Dashboard`,
      redirectURL: '/navbar/home',
      icon: 'dashboard',
    },
    {
      label: 'Admin Status',
      redirectURL: '/navbar/statusDataTable',
      icon: 'check_circle',
    },
    {
      label: 'Add Organization',
      redirectURL: '/navbar/add-organization',
      icon: 'add_circle_outline',
    },
    {
      label: 'View Organization',
      redirectURL: '/navbar/view-all-organizations',
      icon: 'visibility',
    },
    {
      label: 'Logout',
      redirectURL: '/logout',
      icon: 'exit_to_app',
    },
  ];

  collapsed: boolean = false;

  constructor(private router: Router) {}

  collapsedState() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

  sidenavWidth() {
    return this.collapsed ? '65px' : '250px';
  }

  logout() {
    sessionStorage.removeItem('token');
    window.alert('Logged out successfully...');
    this.router.navigate(['/']);
  }
}

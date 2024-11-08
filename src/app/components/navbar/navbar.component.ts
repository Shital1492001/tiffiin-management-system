import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, } from '@angular/router';

export type menus={
  icon: string;
  label:string;
  redirectURL:string
}

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
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  menus=signal<menus[]>([
    {
           label: `Dashboard` ,
           redirectURL: '/',
           icon: 'home'
      },
    {
      label: 'Status',
      redirectURL: '/status',
      icon: 'check_circle'

    },
    {
      label: 'Add Organization',
      redirectURL: '/addnewOrganization',
      icon: 'add_circle_outline'

    },
    {
      label: 'Logout',
      redirectURL: '/logout',
      icon: 'exit_to_app'

    }
  ])

  collapsed=signal(false)
  
  sidenavWidth=computed(()=>this.collapsed() ? '65px' : '250px')



}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, } from '@angular/router';

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
export class NavbarComponent  implements OnInit{

  isMenuOpen = false;
  // menus:{displayName:string, redirectURL: string}[]=[];
 icons=["home","login"]
  menus=[{
      displayName: `Dashboard` ,
      redirectURL: '/',
      icon: 'home'
  }]

  ngOnInit(): void {

    this.menus.push({
      displayName: 'Status',
      redirectURL: '/status',
      icon: 'check_circle'
    })
    // this.menus.push({
    //   displayName: 'Approved Organizations',
    //   redirectURL: '/approvedOrganizations'
    // })
    // this.menus.push({
    //   displayName: 'Pending Organizations',
    //   redirectURL: '/pendingOrganizations'
    // })
    // this.menus.push({
    //   displayName: 'Rejected Organizations',
    //   redirectURL: '/rejectedOrganizations'
    // })
    this.menus.push({
      displayName: 'Add Organization',
      redirectURL: '/addnewOrganization',
      icon: 'add_circle_outline'

    })
    this.menus.push({
      displayName: 'Logout',
      redirectURL: '/logout',
      icon: 'exit_to_app'

    })
  }
  isExpanded=true;



}

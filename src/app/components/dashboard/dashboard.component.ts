import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { Organization } from '../../models/organization';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatDividerModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  organizations:Organization[]=[];


  constructor(private authService:AuthService){
    
  }
  ngOnInit(): void {
    this.fetchAllOrganizations();
  }

  fetchAllOrganizations() {
    this.authService.getAllOrganizations().subscribe({
      next: (responseData) =>{
        console.log("responsedata",responseData);
        this.organizations=responseData.data;
      },
      error: (e) => console.error('Error fetching slots:', e),
      complete: () => console.info('complete') 
    }
      
    );
  }



  organizationss = [
    {
      org_name: 'Pet Care Co.',
      org_type: 'Animal Shelter',
      description: 'A shelter dedicated to rescuing and rehabilitating abandoned animals.',
      org_logo: 'path/to/pet-care-logo.jpg'
    },
    {
      org_name: 'Tech Innovators',
      org_type: 'Technology Firm',
      description: 'An organization focused on pioneering tech solutions for modern challenges.',
      org_logo: 'path/to/tech-innovators-logo.jpg'
    },
    // Additional organization objects...
  ];
}

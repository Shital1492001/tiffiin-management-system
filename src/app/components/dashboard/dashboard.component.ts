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
}

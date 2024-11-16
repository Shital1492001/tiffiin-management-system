import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/organizations';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { OrganizationCardComponent } from '../organizationcard/organizationcard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [OrganizationCardComponent, CommonModule, MatPaginatorModule,MatCardModule,MatIconModule,MatFormFieldModule],
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css'],
})
export class SuperadminComponent implements OnInit {
  organizationsArray: Organization[] = [];
  paginatedOrganizations: Organization[] = [];
  pageSize = 4; 
  currentPage = 0;
  totalItems = 0; 
  totalPages = 0; 

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getAllOrganizations(this.currentPage + 1, this.pageSize); 
  }

  getAllOrganizations(page: number, limit: number): void {
    this.organizationService.getAllOrganizationsApi(page, limit).subscribe({
      next: (orgData) => {
        console.log(orgData);
        this.organizationsArray = orgData.data; 
        this.totalItems = orgData.pagination.totalItems; 
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
        this.updatePaginatedOrganizations(); 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePaginatedOrganizations(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedOrganizations = this.organizationsArray.slice(startIndex, endIndex);
  }

  
  onPageChange(event: PageEvent): void {
    console.log('Page change event:', event);
    this.pageSize = event.pageSize;  
    this.currentPage = event.pageIndex;  
    this.getAllOrganizations(this.currentPage + 1, this.pageSize); 
  }

  deleteOrganization(organizationId: string): void {
    console.log('Deleting organization with ID:', organizationId);
    this.organizationService.deleteOrganizations(organizationId).subscribe({
      next: (responseData) => {
        this.organizationsArray = this.organizationsArray.filter(
          (org) => org._id !== organizationId
        );
        this.updatePaginatedOrganizations(); 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

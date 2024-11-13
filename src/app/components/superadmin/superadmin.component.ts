import { Component } from '@angular/core';
import { Organization } from '../../models/organizations';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationCardComponent } from '../organizationcard/organizationcard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [OrganizationCardComponent, CommonModule],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.css',
})
export class SuperadminComponent {
  organizationsArray: Organization[] = [];
  constructor(private organizationService: OrganizationService) {}
  ngOnInit(): void {
    this.getAllOrganizations();
  }
  getAllOrganizations() {
    const organizationObservable =
      this.organizationService.getAllOrganizationsApi();
    organizationObservable.subscribe({
      next: (orgData) => {
        console.log(orgData)
        this.organizationsArray = orgData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

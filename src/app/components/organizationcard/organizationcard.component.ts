import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Organization } from '../../models/organizations';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatDividerModule],
  templateUrl: './organizationcard.component.html',
  styleUrl: './organizationcard.component.css',
})
export class OrganizationCardComponent {
  @Input()
  organization!: Organization;
}

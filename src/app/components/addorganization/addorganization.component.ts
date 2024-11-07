import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addorganization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './addorganization.component.html',
  styleUrl: './addorganization.component.css',
})
export class AddorganizationComponent {
  organizationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.organizationForm = this.fb.group({
      org_name: ['', Validators.required],
      isActive: [false],
      org_location: this.fb.array([this.createLocationFormGroup()]),
    });
  }

  get locations(): FormArray {
    return this.organizationForm.get('org_location') as FormArray;
  }

  createLocationFormGroup(): FormGroup {
    return this.fb.group({
      loc: ['', Validators.required],
      address: ['', Validators.required],
      loc_contact: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      loc_email: ['', [Validators.required, Validators.email]],
      admin_id: ['', Validators.required],
    });
  }

  addLocation(): void {
    this.locations.push(this.createLocationFormGroup());
  }

  removeLocation(index: number): void {
    this.locations.removeAt(index);
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      const formData = this.organizationForm.value;

      this.organizationService.addOrganizations(formData).subscribe({
        next: (responseData) => {
          if (responseData.statuscode === 201) {
            console.log('Organization added successfully', responseData);
            this.toastr.success('Organization added successfully!', 'Success');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.toastr.error('Error adding organization:', 'Error');
        },
      });
    } else {
      this.organizationForm.markAllAsTouched();
    }
  }
}

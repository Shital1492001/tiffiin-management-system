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
import { SnackbarService } from '../../services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css'],
})
export class AddOrganizationComponent {
  organizationForm: FormGroup;
  collapsedStates: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.organizationForm = this.fb.group({
      org_name: ['', Validators.required],
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
      collapsed: [false],
    });
  }

  addLocation(): void {
    this.locations.controls.forEach((loc) => {
      (loc as FormGroup).get('collapsed')?.setValue(true);
    });
    this.locations.push(this.createLocationFormGroup());
    const newLocation = this.locations.at(this.locations.length - 1);
    newLocation.get('collapsed')?.setValue(false);
  }

  toggleLocation(index: number) {
    const location = this.locations.at(index);
    const currentCollapsedState = location.get('collapsed')!.value;
    location.get('collapsed')!.setValue(!currentCollapsedState);
  }
  setCollapsedValue(index: number, collapsed: boolean): void {
    this.collapsedStates[index] = collapsed;
  }

  getCollapsedValue(locationIndex: number): boolean {
    const location = this.locations.at(locationIndex);
    return location.get('collapsed') ? location.get('collapsed')!.value : false;
  }

  removeLocation(index: number): void {
    this.locations.removeAt(index);
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      const formData = { ...this.organizationForm.value };
      formData.org_location = formData.org_location.map((location: any) => {
        const { collapsed, ...rest } = location;
        return rest;
      });
      console.log(formData);
      this.organizationService.addOrganizations(formData).subscribe({
        next: (responseData) => {
          console.log(responseData);
          if (responseData.statuscode === 201) {
            console.log('Organization added successfully', responseData);
            this.snackbar.showSuccess('Organization added successfully!');
          }
        },
        error: (error) => {
          this.snackbar.showError('Error adding organization!');
          console.log('Error adding organization...', error);
        },
      });
    } else {
      this.organizationForm.markAllAsTouched();
      this.snackbar.showError('Please fill in all required fields!');
    }
  }
}

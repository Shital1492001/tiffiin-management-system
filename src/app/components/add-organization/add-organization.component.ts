import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { markAllControlsAsDirtyAndTouched } from '../../utils';

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
  isUpdateMode: boolean = false;
  viewMode: boolean = false;
  organizationId: string = '';

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.organizationForm = this.fb.group({
      orgName: ['', Validators.required],
      orgLocation: this.fb.array([this.createLocationFormGroup()]),
    });
  }

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id') || '';
    const routePath = this.route.snapshot.routeConfig?.path || '';
    this.viewMode = routePath.startsWith('view-organization') && !!this.organizationId;
    this.isUpdateMode = !this.viewMode && !!this.organizationId;
    if (this.viewMode || this.isUpdateMode) {
      this.loadOrganizationData(this.organizationId);
    } else {
      this.organizationForm;
    }
  }

  loadOrganizationData(organizationId: string): void {
    if (!organizationId) {
      console.error('No organization ID found in the route.');
      this.snackbar.showError('No organization ID found in the route.');
      return;
    }
    this.organizationService.getOrganizationById(organizationId).subscribe({
      next: (responseData) => {
        const organization = responseData.data;
        console.log("load",organization);
        if (!organization) {
          console.error('Organization not found.');
          this.snackbar.showError('Organization not found!');
          return;
        }

        const { org_name, org_location } = organization;
        this.organizationForm = this.fb.group({
          orgName: [org_name, Validators.required],
          orgLocation: this.fb.array(
            org_location.map((location) =>
              this.fb.group({
                branchName: [location.loc, Validators.required],
                address: [location.address, Validators.required],
                contactNumber: [
                  location.loc_contact,
                  [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
                ],
                email: [
                  location.loc_email,
                  [Validators.required, Validators.email],
                ],
              })
            )
          ),
        });

        if (this.viewMode) {
          this.organizationForm.value();
        }
      },
      error: (err) => {
        console.error('Error fetching organization:', err);
        this.snackbar.showError('Error loading organization data!');
      },
    });
  }

  get locations(): FormArray {
    return this.organizationForm.get('orgLocation') as FormArray;
  }

  createLocationFormGroup(): FormGroup {
    return this.fb.group({
      branchName: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addLocation(): void {
    this.locations.push(this.createLocationFormGroup());
    this.collapsedStates.push(false); 
  }

  toggleLocation(index: number): void {
    this.collapsedStates[index] = !this.collapsedStates[index];
  }
  setCollapsedValue(index: number, collapsed: boolean): void {
    this.collapsedStates[index] = collapsed;
  }

  getCollapsedValue(locationIndex: number): boolean {
    return this.collapsedStates[locationIndex];
  }
  
  removeLocation(index: number): void {
    this.locations.removeAt(index);
  }

  get orgName() {
    return this.organizationForm.get('orgName');
  }

  get errorMessageOrgName(): string {
    const control = this.orgName;
    if (!control) return '';
    if (control.dirty && control.touched) {
    switch (true) {
      case control.hasError('required'):
        return 'Organization name is required!';
      default:
        return '';
    }
  }
  else{
    return '';
  }
}

  email(index: number) {
    return this.locations.controls[index]?.get('email');
  }

  get errorMessageEmail(): (index: number) => string {
    return (index: number): string => {
      const control = this.email(index);
      if (!control) return '';
      if (control.dirty && control.touched) {
        switch (true) {
          case control.hasError('required'):
            return 'Email is required...!';
          case control.hasError('email'):
            return 'Please enter a valid email address!';
          default:
            return '';
        }
      } else {
        return '';
      }
    };
  }

  branchName(index: number) {
    return this.locations.controls[index]?.get('branchName');
  }

  get errorMessageLoc(): (index: number) => string {
    return (index: number): string => {
      const control = this.branchName(index);
      if (!control) return '';
      if (control.dirty && control.touched) {
        switch (true) {
          case control.hasError('required'):
            return 'Branch Name is required...!';
          default:
            return '';
        }
      } else {
        return '';
      }
    };
  }

  address(index: number) {
    return this.locations.controls[index]?.get('address');
  }

  get errorMessageAddress(): (index: number) => string {
    return (index: number): string => {
      const control = this.address(index);
      if (!control) return '';
      if (control.dirty && control.touched) {
        switch (true) {
          case control.hasError('required'):
            return 'Address is required...!';
          default:
            return '';
        }
      } else {
        return '';
      }
    };
  }

  contactNumber(index: number) {
    return this.locations.controls[index]?.get('contactNumber');
  }

  get errorMessageContact(): (index: number) => string {
    return (index: number): string => {
      const control = this.contactNumber(index);
      if (!control) return '';
      if (control.dirty && control.touched) {
        switch (true) {
          case control.hasError('required'):
            return 'Contact Number is required...!';
          case control.hasError('pattern'):
            return 'Contact number must be exactly 10 digits!';
          default:
            return '';
        }
      } else {
        return '';
      }
    };
  }

  onSubmit(): void {
    if (this.isUpdateMode) {
      const formData = { ...this.organizationForm.value };
      formData.org_name = formData.orgName;
      formData.org_location = formData.orgLocation.map((location: any) => ({
        loc: location.branchName,
        address: location.address,
        loc_contact: location.contactNumber,
        loc_email: location.email,
      }));
      this.organizationService
        .updateOrganization(this.organizationId, formData)
        .subscribe({
          next: (responseData) => {
            if (responseData.statuscode === 200) {
              console.log('Organization updated successfully', responseData);
              this.snackbar.showSuccess('Organization updated successfully!');
              this.router.navigate(['/navbar/view-all-organizations']);
            }
          },
          error: (error) => {
            this.snackbar.showError('Error updated organization!');
            console.log('Error updated organization...', error);
          },
        });
    } else {
      if (this.organizationForm.valid) {
        const formData = { ...this.organizationForm.value };
        formData.org_name = formData.orgName;
        formData.org_location = formData.orgLocation.map((location: any) => ({
        loc: location.branchName,
        address: location.address,
        loc_contact: location.contactNumber,
        loc_email: location.email,
      }));
        console.log("add",formData)
        this.organizationService.addOrganizations(formData).subscribe({
          next: (responseData) => {
            if (responseData.statuscode === 201) {
              console.log('Organization added successfully', responseData);
              this.snackbar.showSuccess('Organization added successfully!');
              this.router.navigate(['/navbar/view-all-organizations']);
            }
          },
          error: (error) => {
            this.snackbar.showError('Error adding organization!');
            console.log('Error adding organization...', error);
          },
        });
      } else {
        markAllControlsAsDirtyAndTouched(this.organizationForm);
        this.snackbar.showError('Please fill in all required fields!');
      }
    }
  }
}

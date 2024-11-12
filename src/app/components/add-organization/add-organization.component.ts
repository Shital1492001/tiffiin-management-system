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
      org_name: ['', Validators.required],
      org_location: this.fb.array([this.createLocationFormGroup()]),
    });
  }

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.paramMap.get('id') || '';
    if (this.route.snapshot.routeConfig?.path?.startsWith('view-organization') && this.route.snapshot.paramMap.has('id')) {
      this.viewMode = true; 
      this.viewMode = !!this.organizationId;
      this.loadOrganizationData();
    } else if (this.organizationId) {
      this.isUpdateMode = true;
      this.isUpdateMode = !!this.organizationId;
      this.loadOrganizationData();
    }
    
    if (!this.viewMode) {
    this.organizationForm = this.fb.group({
      org_name: ['', Validators.required],
      org_location: this.fb.array([this.createLocationFormGroup()]),
    });
  }
  }

  loadOrganizationData(): void {
    if (this.organizationId) {
      this.organizationService
        .getOrganizationById(this.organizationId)
        .subscribe({
          next: (responseData) => {
            console.log('by id', responseData);
            const orgName = responseData.data.org_name;
            console.log(orgName);
            if (responseData.data) {
              console.log(responseData.data.org_name);
              const organization = responseData.data.org_name;
              const locations = responseData.data.org_location;
              this.organizationForm.patchValue({
                org_name: organization
              });
              const locationsFormArray = this.organizationForm.get('org_location') as FormArray;
              locationsFormArray.clear(); 
            locations.forEach((location) => {
              locationsFormArray.push(this.fb.group({
                loc: [location.loc, Validators.required],
                address: [location.address, Validators.required],
                loc_contact: [location.loc_contact, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
                loc_email: [location.loc_email, [Validators.required, Validators.email]],
                // collapsed: [this.isUpdateMode],
              }));
            });
              if (this.viewMode) {
                this.organizationForm.patchValue({
                org_name: organization,
                // org_location: location,
                });
              }
            } else {
              console.error('Organization not found.');
              this.snackbar.showError('Organization not found!');
            }
          },
          error: (err) => {
            console.error('Error fetching organization:', err);
            this.snackbar.showError('Error loading organization data!');
          },
        });
    } else {
      console.error('No organization ID found in the route.');
      this.snackbar.showError('No organization ID found in the route.');
    }
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
      collapsed: [this.isUpdateMode],
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

  get org_name() {
    return this.organizationForm.get('org_name');
  }

  get errorMessageOrgName(): string {
    const control = this.org_name;
    if (!control) return '';
    switch (true) {
      case control.hasError('required') && control.dirty && control.touched && control.invalid:
        return 'Organization name is required!';
      default:
        return '';
    }
  }

  loc_email(index:number) {
    return this.locations.controls[index]?.get('loc_email');
  }

  get errorMessageEmail(): (index: number) => string {
    return (index: number): string =>{
    const control = this.loc_email(index);
    if (!control) return '';
    if(control.dirty && control.touched){
      switch (true) {
        case control.hasError('required'):
          return 'Email is required...!';
        case control.hasError('email'):
          return 'Please enter a valid email address!';
        default:
          return '';
      }
    }
    else{
      return '';
    }
  }
  }

  loc(index:number) {
    return this.locations.controls[index]?.get('loc');
  }

  get errorMessageLoc(): (index: number) => string {
    return (index: number): string =>{
    const control = this.loc(index);
    if (!control) return '';
    if(control.dirty && control.touched){
      switch (true) {
        case control.hasError('required'):
          return 'Branch Name is required...!';
        default:
          return '';
      }
    }
    else{
      return '';
    }
  }
}

  address(index:number) {
    return this.locations.controls[index]?.get('address');
  }

  get errorMessageAddress(): (index: number) => string {
    return (index: number): string =>{
    const control = this.address(index);
    console.log(control)
    if (!control) return '';
    if(control.dirty && control.touched){
      switch (true) {
        case control.hasError('required'):
          return 'Address is required...!';
        default:
          return '';
      }
    }
    else{
      return '';
    }
  }
}

  loc_contact(index:number) {
    return this.locations.controls[index]?.get('loc_contact');
  }

  get errorMessageContact(): (index: number) => string {
    return (index: number): string =>{
    const control = this.loc_contact(index);
    console.log(control)
    if (!control) return '';
    if(control.dirty && control.touched){
      switch (true) {
        case control.hasError('required'):
          return 'Contact Number is required...!';
        case control.hasError('pattern'):
          return 'Contact number must be exactly 10 digits!';
        default:
          return '';
      }
    }
    else{
      return '';
    }
  }
}

  onSubmit(): void {
    if (this.isUpdateMode) {
      const formData = { ...this.organizationForm.value };
      formData.org_location = formData.org_location.map((location: any) => {
        const { collapsed, ...rest } = location;
        return rest;
      });
      this.organizationService
        .updateOrganization(this.organizationId, formData)
        .subscribe({
          next: (responseData) => {
            console.log(responseData);
            if (responseData.statuscode === 200) {
              console.log('Organization updated successfully', responseData);
              this.snackbar.showSuccess('Organization updated successfully!');
              this.router.navigate(['/superAdminDashboard']);
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
              this.router.navigate(['/superAdminDashboard']);
            }
          },
          error: (error) => {
            this.snackbar.showError('Error adding organization!');
            console.log('Error adding organization...', error);
          },
        });
      } else {
        this.markAllControlsAsDirtyAndTouched(this.organizationForm);
        this.snackbar.showError('Please fill in all required fields!');
      }
    }
  }
  
  private markAllControlsAsDirtyAndTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllControlsAsDirtyAndTouched(control);
      }
    });
  }
}

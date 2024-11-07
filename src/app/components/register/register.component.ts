import { Component, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExactLengthValidator } from '../../customValidations/exact-length-validator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CustomValidators } from '../../customValidations/custom-validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Organization } from '../../models/organization';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddorganizationComponent } from '../addorganization/addorganization.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    AddorganizationComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  adminForm: FormGroup;
  organizations: Organization[] = [];

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.adminForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.\-_$@*!]{3,20}$/),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        contact_number: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          ExactLengthValidator.exactLengthValidator(10),
        ]),
        address: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        organization_id: new FormControl('', [Validators.required]),
        role: new FormControl('Admin'),
      },
      [CustomValidators.valueMatch3('password', 'confirmPassword')]
    );
  }

  ngOnInit(): void {
    this.fetchAllOrganizations();
  }

  get username() {
    return this.adminForm.get('username');
  }
  get email() {
    return this.adminForm.get('email');
  }
  get contact_number() {
    return this.adminForm.get('contact_number');
  }
  get address() {
    return this.adminForm.get('address');
  }
  get password() {
    return this.adminForm.get('password');
  }
  get confirmPassword() {
    return this.adminForm.get('confirmPassword');
  }
  get organization_id() {
    return this.adminForm.get('organization_id');
  }
  get role() {
    return this.adminForm.get('role');
  }

  fetchAllOrganizations() {
    this.authService.getAllOrganizations().subscribe({
      next: (responseData) => {
        console.log('responsedata', responseData);
        this.organizations = responseData.data;
      },
      error: (e) => console.error('Error fetching slots:', e),
      complete: () => console.info('complete'),
    });
  }

  CollectData() {
    if (
      this.username &&
      this.email &&
      this.contact_number &&
      this.address &&
      this.password &&
      this.organization_id &&
      this.role
    ) {
      this.authService
        .register(
          this.username.value,
          this.email.value,
          this.contact_number.value,
          this.address.value,
          this.password.value,
          this.organization_id.value,
          this.role.value
        )
        .subscribe({
          next: (responseData) => {
            if ((responseData.message = 'User registered successfully')) {
              console.log('Admin Registered Data', responseData);
              this.toastr.success('Registration successful!', 'Success');
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            console.error('Registration failed:', err);
            this.toastr.error(
              'Registration failed...Please try again...',
              'Error'
            );
          },
        });
    } else {
      this.toastr.error(
        'Please fill all required fields correctly.',
        'Validation Error'
      );
    }
  }
}

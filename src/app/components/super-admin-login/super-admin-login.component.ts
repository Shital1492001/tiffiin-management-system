import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login, Token } from '../../models/userlogin';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CustomPasswordValidators } from '../../customValidators/custom-password-validators';
@Component({
  selector: 'app-super-admin-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './super-admin-login.component.html',
  styleUrl: './super-admin-login.component.css',
})
export class SuperAdminLoginComponent {
  errorMessage: string = '';
  accessToken: Token = {
    token: '',
    message: '',
    statuscode: 0,
    success: false,
    _id: '',
  };
  passwordValidity: string = '';
  StrongPasswordRegx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  constructor(private authService: AuthService, private route: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.StrongPasswordRegx),
      Validators.minLength(2),
      CustomPasswordValidators.logPatternError(),
    ]),
  });
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get isEmailValid() {
    return this.email?.errors?.['email'] && this.email?.touched;
  }
  get minLength() {
    return this.password?.errors?.['minlength'] && this.password?.touched;
  }
  get mandatory() {
    return this.password?.errors?.['required'] && this.password?.touched;
  }
  get noNumber(): boolean {
    return (
      this.password?.errors?.['noNumber'] &&
      this.password?.touched &&
      this.password?.dirty
    );
  }
  get noSpecialChars(): boolean {
    return this.password?.errors?.['noSpecialChars'] && this.password?.touched;
  }
  get noLowerCase(): boolean {
    return this.password?.errors?.['noLowerCase'] && this.password?.touched;
  }
  get noUpperCase(): boolean {
    return this.password?.errors?.['noUpperCase'] && this.password?.touched;
  }

  loginAdmin() {
    const login = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    console.log('outside if loginAdmin');
    console.log('loginCred-', login);
    if (login.password && login.email) {
      const tokenObservable = this.authService.authenticateLogin(login);
      console.log('tokenObservable', tokenObservable);
      tokenObservable.subscribe({
        next: (data) => {
          console.log('token', data);
          // this.accessToken = data;
          // console.log(this.accessToken);
          sessionStorage.setItem('token', data.token);
          this.route.navigate(['/superAdminDashboard/', data._id]);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  SimpleChanges,
} from '@angular/core';
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
  login: Login = {
    email: '',
    password: '',
  };
  passwordValidity: string = '';
  loginForm!: FormGroup;
  StrongPasswordRegx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  numeral: RegExp = /[0-9]/;
  noSpecialChar: RegExp = /^[a-zA-Z0-9]*$/;
  lowerCase: RegExp = /[a-z]/;
  upperCase: RegExp = /[A-Z]/;

  constructor(private authService: AuthService, private route: Router) {
    // Initialize form group with validation
    this.loginForm = new FormGroup({
      email: new FormControl(this.login.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.login.password, [
        Validators.required,
        Validators.pattern(this.StrongPasswordRegx),
      ]),
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    console.log('outside if of ngChanges');
    this.loginForm.get('password')?.valueChanges.subscribe({
      next: () => {
        this.logPatternError();
      },
    });
  }
  sendLoginData() {
    // this.login=this.loginForm.value
  }
  logPatternError() {
    const passwordValue = this.password?.value || '';
    const usernameErrors = this.loginForm.get('password')?.errors;
    console.log('usernameErrors', usernameErrors);
    console.log(usernameErrors?.['pattern']);
    const patternObject = usernameErrors?.['pattern'];
    if (patternObject) {
      console.log('actualValue', patternObject.actualValue);
      if (!this.numeral.test(passwordValue)) {
        console.log(
          'inside the if this.numeral.test(passwordValue)',
          passwordValue
        );
        this.passwordValidity = 'at least one number required';
      } else if (this.noSpecialChar.test(passwordValue)) {
        this.passwordValidity = 'atleast one special character required';
      } else if (!this.lowerCase.test(passwordValue)) {
        this.passwordValidity = 'atleast one lowercase character required';
      } else if (!this.upperCase.test(passwordValue)) {
        this.passwordValidity = 'atleast one uppercase character required';
      } else {
        this.passwordValidity = '';
      }
      // console.log('Pattern error:', usernameErrors['pattern'])
    }
    console.log('passwordValidity', this.passwordValidity);
  }
  loginAdmin() {
    this.login = this.loginForm.value;
    console.log('outside if loginAdmin');
    console.log('loginCred-', this.login);

    if (this.login.password && this.login.email) {
      const tokenObservable = this.authService.authenticateLogin(this.login);
      console.log('tokenObservable', tokenObservable);
      tokenObservable.subscribe({
        next: (data) => {
          console.log('token', data);
          this.accessToken = data;
          console.log(this.accessToken);
          sessionStorage.setItem('token', this.accessToken.token);
          const setToken = sessionStorage.getItem('token');
          console.log('localsetToken', setToken);
          if (setToken) {
            this.route.navigate([
              '/superAdminDashboard/',
              this.accessToken._id,
            ]);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token } from '../models/userlogin';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin, AdminRegister } from '../models/Admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrlLogin = environment.apiEndpointauth + '/login';
  authenticateLogin(loginCredentials: Login): Observable<Token> {
    console.log(environment.apiEndpointOrganization);
    console.log(environment.apiEndpointauth + '/login');
    const data = this.http.post<Token>(this.baseUrlLogin, loginCredentials);
    return data;
  }
  isAuthenticated(): boolean {
    const setToken = sessionStorage.getItem('token');
    if (setToken) {
      return true;
    }
    return false;
  }
  baseUrlRegistration = environment.apiEndpointauth + '/register';
  register(
    formData: Admin
  ): Observable<AdminRegister> {

    // console.log(admin)
    return this.http.post<AdminRegister>(this.baseUrlRegistration, formData);
  }
}

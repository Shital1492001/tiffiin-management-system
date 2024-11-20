import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token } from '../models/userlogin';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin, AdminRegister, UserByToken } from '../models/admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrlLogin = environment.apiEndpoint + '/auth/login';
  authenticateLogin(loginCredentials: Login): Observable<Token> {
    console.log(environment.apiEndpoint + '/login');
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

  getUserTypeByToken(): Observable<UserByToken> {
    const baseUrlUserType = environment.apiEndpoint + '/auth/getuserbytoken';
    const userData = this.http.get<UserByToken>(baseUrlUserType);
    return userData;
  }

  baseUrlRegistration = environment.apiEndpoint+ '/auth/register';
  register(
    formData: Admin
  ): Observable<AdminRegister> {

    // console.log(admin)
    return this.http.post<AdminRegister>(this.baseUrlRegistration, formData);
  }
}

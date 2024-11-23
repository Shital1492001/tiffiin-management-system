import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Roles, Token } from '../models/userlogin';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin, AdminRegister, UserByToken } from '../models/admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrlLogin = environment.apiEndpoint + '/auth/login';
  constructor(private http: HttpClient) {
    const role = sessionStorage.getItem('role');
    if (role) {
      this.roleSubject.next(role);
    }
  }
  authenticateLogin(loginCredentials: Login): Observable<Token> {
    console.log(environment.apiEndpoint + '/auth/login');
    const data = this.http.post<Token>(this.baseUrlLogin, loginCredentials);
    return data;
  }

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  setRole(role: string): void {
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role);
  }
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isSuperAdmin(): boolean {
    console.log('this.roleSubject.getValue()', this.roleSubject.getValue());

    return this.roleSubject.getValue() === Roles.SUPER_ADMIN;
  }
  isAdmin(): boolean {
    console.log('this.roleSubject.getValue()', this.roleSubject.getValue());
    return this.roleSubject.getValue() === Roles.ADMIN;
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

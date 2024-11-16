import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Roles, Token } from '../models/userlogin';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin, AdminRegister } from '../models/admin';

import { UserByToken } from '../models/admin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    const role_id = sessionStorage.getItem('role_id');
    if (role_id) {
      this.roleSubject.next(role_id);
    }
  }
  baseUrlLogin = environment.apiEndpointauth + '/login';
  authenticateLogin(loginCredentials: Login): Observable<Token> {
    console.log(environment.apiEndpointOrganization);
    console.log(environment.apiEndpointauth + '/login');
    const data = this.http.post<Token>(this.baseUrlLogin, loginCredentials);
    return data;
  }

  private roleSubject = new BehaviorSubject<string | null>(null);
  public role_id$ = this.roleSubject.asObservable();

  setRole(role_id: string): void {
    sessionStorage.setItem('role_id', role_id);
    this.roleSubject.next(role_id);
  }
  getRole(): string | null {
    return sessionStorage.getItem('role_id');
  }

  isSuperAdmin(): boolean {
    console.log('this.roleSubject.getValue()', this.roleSubject.getValue());

    return this.roleSubject.getValue() === Roles.SUPER_ADMIN;
  }
  isAdmin(): boolean {
    console.log('this.roleSubject.getValue()', this.roleSubject.getValue());
    return this.roleSubject.getValue() === Roles.ADMIN;
  }

  getUserTypeByToken(): Observable<UserByToken> {
    const baseUrlUserType = environment.apiEndpointauth + '/getuserbytoken';
    const userData = this.http.post<UserByToken>(baseUrlUserType, {});
    return userData;
  }

  /*
  isSuperAdmin(): Observable<boolean> {
    return this.getUserTypeByToken().pipe(
      map((userData: { data: { role_id: string } }) => {
        const superAdminRoleId = userData.data.role_id;
        console.log('userRoleId:', superAdminRoleId);
        return superAdminRoleId === Roles.SUPER_ADMIN;
      })
    );
  }
*/
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
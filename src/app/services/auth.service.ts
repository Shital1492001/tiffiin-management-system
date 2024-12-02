import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Roles, Token } from '../models/userlogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Admin, AdminRegister, CloudinaryResponse } from '../models/admin';

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

  getUserTypeByToken(): Observable<UserByToken> {
    const baseUrlUserType = environment.apiEndpointauth + '/getuserbytoken';
    const userData = this.http.get<UserByToken>(baseUrlUserType);
    return userData;
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
  // this.http.get<{ user_image: string }>(`/api/user/${userId}`).subscribe({
  //   next: (response) => {
  //     this.userImageUrl = response.user_image;
  //   },
  //   error: (err) => {
  //     console.error('Error fetching user profile image:', err);
  //   },
  // });
  baseUrlUserImage = environment.apiEndpointauth + '/uploaduserimage';
  uploadUserImage(userId: string, file: File): Observable<AdminRegister> {
    const formData = new FormData();
    formData.append('recfile', file);

    return this.http.post<AdminRegister>(
      `${this.baseUrlUserImage}/uploaduserimage/${userId}`,
      formData
    );
  }

  updateProfile(id:string, formadata:Admin){
    const obs=this.http.put(`${environment.apiEndpointauth}/updateprofile/${id}`,formadata)
    console.log("in update profile service");
    return obs;
    
  }

  uploadImage(file: File): Observable<CloudinaryResponse> {
    const baseUrlOrgImage = environment.apiEndpointauth + '/uploaduserimage'
    let formData = new FormData();
    formData.append('recfile', file)
    const observableData = this.http.post<CloudinaryResponse>(
      baseUrlOrgImage,
      formData
    );
    return observableData;
  }

}
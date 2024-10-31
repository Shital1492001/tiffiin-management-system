import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';

export interface AllOrganizations {
  data: Organization[];
}

export interface AdminRegister {
  // data:Admin[];
  message: string;
  statuscode: number;
  _id: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // send Admin details to the backend for registration
  register(
    username: string,
    email: string,
    contact_number: number,
    address: string,
    password: string,
    organization_id: string,
    role: string
  ): Observable<AdminRegister> {
    const admin = {
      username,
      email,
      contact_number,
      address,
      password,
      organization_id,
      role,
    };
    // console.log(admin)
    return this.http.post<AdminRegister>(`${this.apiUrl}/auth/register`, admin);
  }

  // getall organizations details from the backend
  getAllOrganizations(): Observable<AllOrganizations> {
    const obs = this.http.get<AllOrganizations>(
      `${this.apiUrl}/organizations/getall`
    );
    // console.log("getAllOrganizations...",obs)
    return obs;
  }
}

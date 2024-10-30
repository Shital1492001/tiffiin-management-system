import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';

export interface UserData{
  statusCode:number,
  success:boolean,
  message:string,
  // user:User[],
  _id:string,
  username:string,
  token:string
}

export interface AllOrganizations{
  // map(arg0: (org: AllOrganizations) => string): string[];
  data:Organization[];
  // isActice:boolean,
  // org_created_at:Date,
  // org_location:Location[],
  // org_name:string,
  // org_updated_at:Date,
  // _id:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginFlag=false;
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:5000/api'; 
  private userId ='';

  constructor(private http: HttpClient) { }

  // send user details to the backend for registration
  register(username: string, email:string, contact_number: number,address:string, password: string,organization_id:string,role:string): Observable<any> {
    const admin = {username,email,contact_number,address,password,organization_id,role };
    // this.toastr.success("Registration successfully....!")
    console.log(admin)
    return this.http.post<any>(`${this.apiUrl}/auth/register`, admin);  
  }

  getAllOrganizations():Observable<AllOrganizations>{
    const obs=this.http.get<AllOrganizations>(`${this.apiUrl}/organizations/getall`)
    console.log("getAllOrganizations...",obs)
    return obs;
  }
}

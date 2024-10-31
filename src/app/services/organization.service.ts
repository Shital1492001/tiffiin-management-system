import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../models/organizations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrlOrg="http://localhost:5000/api/organizations" 
  constructor(private http:HttpClient) { }
  getAllOrganizationsApi():Observable<Organization[]>{
    // here extract data array and return 
    return this.http.get<Organization[]>(this.baseUrlOrg+'/getall')
  }
}

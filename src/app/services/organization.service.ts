import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../models/organization';
import { Observable } from 'rxjs';


export interface AllOrganizations {
  statuscode:number;
  data: Organization[];
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // getall organizations details from the backend
  getAllOrganizations(): Observable<AllOrganizations> {
    const obs = this.http.get<AllOrganizations>(
      `${this.apiUrl}/organizations/getall`
    );
    // console.log("getAllOrganizations...",obs)
    return obs;
  }

  addOrganizations(formData:Organization): Observable<AllOrganizations> {
    //  const headers = this.getAuthHeaders();
    //  const credentials = { isActive, org_name,org_location};
     const obs=this.http.post<AllOrganizations>(`${this.apiUrl}/organizations/add`, formData);  
     console.log(obs);
     return obs;
   }
}

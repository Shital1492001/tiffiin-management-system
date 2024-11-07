import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allOrganization, Organization } from '../models/organizations';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrlOrg = environment.apiEndpointOrganization + '/getallOrganization';
  AddOrgUrl = environment.apiEndpointOrganization + '/addOrganization';
  DeleteOrgUrl = environment.apiEndpointOrganization + '/deleteOrganization';
  UpdateOrgUrl = environment.apiEndpointOrganization + '/updateOrganization'
  constructor(private http: HttpClient) {}

  getAllOrganizationsApi(): Observable<allOrganization> {
    // here extract data array and return
    const observableData = this.http.get<allOrganization>(this.baseUrlOrg);
    return observableData;
  }

  addOrganizations(formData:Organization): Observable<allOrganization> {
     const obs=this.http.post<allOrganization>(this.AddOrgUrl,formData);  
     console.log(obs);
     return obs;
   }
  
  deleteOrganizations(_id:string): Observable<allOrganization>{
     console.log(_id);
     const obs=this.http.delete<allOrganization>(this.DeleteOrgUrl+'/_id');  
     console.log(obs);
     return obs;
   }

  updateOrganizations(formData:Organization,_id:string): Observable<allOrganization>{
    console.log(formData)
    console.log(_id);
     const obs=this.http.put<allOrganization>(this.UpdateOrgUrl+'/_id',formData);  
     console.log(obs);
     return obs;
  }
}
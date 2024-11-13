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
  addOrgUrl = environment.apiEndpointOrganization + '/addOrganization';
  constructor(private http: HttpClient) {}
  getAllOrganizationsApi(): Observable<allOrganization> {
    // here extract data array and return
    const observableData = this.http.get<allOrganization>(this.baseUrlOrg);
    return observableData;
  }
  addOrganizations(formData:Organization): Observable<allOrganization>{
    const observableData = this.http.post<allOrganization>(this.addOrgUrl,formData);
    return observableData;
  }
}
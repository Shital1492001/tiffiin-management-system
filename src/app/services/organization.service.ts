import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allOrganization, Organization } from '../models/organizations';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrlOrg =
    environment.apiEndpoint + '/superadmin/organizations/getallOrganization';
  constructor(private http: HttpClient) {}
  getAllOrganizationsApi(): Observable<allOrganization> {
    const observableData = this.http.get<allOrganization>(this.baseUrlOrg);
    return observableData;
  }
}

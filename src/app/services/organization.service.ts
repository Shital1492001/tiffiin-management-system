import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllOrganization, Organization } from '../models/organizations';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrlOrg = environment.apiEndpointOrganization + '/getallOrganization';
  constructor(private http: HttpClient) {}
  getAllOrganizationsApi(): Observable<AllOrganization> {
    // here extract data array and return
    const observableData = this.http.get<AllOrganization>(this.baseUrlOrg);
    return observableData;
  }
}

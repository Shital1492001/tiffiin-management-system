import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllOrganization } from '../models/organizations';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrlOrg =
    environment.apiEndpoint + '/superadmin/organizations/getallOrganization';
  constructor(private http: HttpClient) { }
  getAllOrganizationsApi(): Observable<AllOrganization> {
    const observableData = this.http.get<AllOrganization>(this.baseUrlOrg);
    return observableData;
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllOrganization, AllOrganizations } from '../models/organizations';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organization } from '../models/organizations';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrlOrg = environment.apiEndpointOrganization + '/getallOrganization';
  addOrgUrl = environment.apiEndpointOrganization + '/addOrganization';
  deleteOrgUrl = environment.apiEndpointOrganization + '/deleteOrganization';
  getOrgByIdUrl = environment.apiEndpointOrganization + '/getOrganization';
  updateOrgUrl = environment.apiEndpointOrganization + '/updateOrganization';
  searchOrgUrl = environment.apiEndpointOrganization + '/searchOrganizations';

  constructor(private http: HttpClient) { }
  getAllOrganizationsApi(page: number, limit: number): Observable<AllOrganization> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    const observableData = this.http.get<AllOrganization>(this.baseUrlOrg, { params });
    return observableData;
  }
  getAllOrganizationApi(flag: boolean): Observable<AllOrganization> {
    const params = new HttpParams().set('status', flag.toString());
    const observableData = this.http.get<AllOrganization>(this.baseUrlOrg, {
      params,
    });
    // console.log('jhgj', observableData);
    return observableData;
  }
  addOrganizations(formData: Organization): Observable<AllOrganization> {
    const observableData = this.http.post<AllOrganization>(this.addOrgUrl, formData);
    return observableData;
  }

  deleteOrganizations(id: string): Observable<AllOrganization> {
    console.log(id)
    const observableData = this.http.delete<AllOrganization>(`${this.deleteOrgUrl}/${id}`);
    return observableData;
  }

  getOrganizationById(id: string): Observable<AllOrganizations> {
    const observableData = this.http.get<AllOrganizations>(`${this.getOrgByIdUrl}/${id}`);
    return observableData;
  }

  updateOrganization(id: string, formData: Organization): Observable<AllOrganization> {
    const observableData = this.http.put<AllOrganization>(`${this.updateOrgUrl}/${id}`, formData);
    return observableData;
  }

  searchOrganization(orgName: string): Observable<AllOrganization> {
    const encodedQuery = encodeURIComponent(orgName);
    // const params = new HttpParams().set('query', encodedQuery);
    const observableData = this.http.get<AllOrganization>(
      `${this.searchOrgUrl}?query=${encodedQuery}`
    );
    console.log(observableData);
    return observableData;
  }
}
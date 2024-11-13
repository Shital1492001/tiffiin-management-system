import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllResponses } from '../models/admin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuperadminService {
  constructor(private http: HttpClient) {}
  getPendingRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(
      environment.apiEndpointSuperAdmin + '/pendingAdminApproval'
    );
    console.log(response);
    return response;
  }

  getRejectedRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(
      environment.apiEndpointSuperAdmin + '/rejectedAdminApproval'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(
      environment.apiEndpointSuperAdmin + '/approvedAdminApproval'
    );
    console.log(response);
    return response;
  }
  getRequestsByStatus(status: string): Observable<AllResponses> {
    console.log('inside getRequestsByStatus');
    // http://localhost:5000/api/superadmin/getAllAdminrequest?status=rejected
    const apiUrl = `${environment.apiEndpointSuperAdmin}/getAllAdminrequest?status=${status}`;
    console.log('apiUrl', apiUrl);
    return this.http.get<AllResponses>(apiUrl);
  }

  approveAdminById(id: string): Observable<Object> {
    const approveAdminUrl =
      environment.apiEndpointSuperAdmin + '/approveadmin/' + id;
    return this.http.put<Object>(approveAdminUrl, {});
  }
  rejectAdminById(id: string): Observable<Object> {
    const rejectAdminUrl =
      environment.apiEndpointSuperAdmin + '/rejectadmin/' + id;
    return this.http.put<Object>(rejectAdminUrl, {});
  }
}

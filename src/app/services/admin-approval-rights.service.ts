import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allAdminStatusResponses } from '../models/admin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminApprovalRightsService {
  constructor(private http: HttpClient) {}
  getPendingRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointAdmin + '/pendingRetailers'
    );

    console.log('response', response);
    return response;
  }

  getRejectedRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointAdmin + '/getrejectedRetailers'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointAdmin + '/getapprovedRetailers'
    );
    return response;
  }

  getRequestsByStatus(status: string): Observable<allAdminStatusResponses> {
    console.log('inside getRequestsByStatus');
    const apiUrl = `${environment.apiEndpointAdmin}/getallRetailers?status=${status}`;
    console.log('apiUrl', apiUrl);
    return this.http.get<allAdminStatusResponses>(apiUrl);
  }

  approveRetailer(id: string): Observable<Object> {
    const approveRetailerUrl =
      environment.apiEndpointAdmin + '/approveRetailer/' + id;
    return this.http.put<Object>(approveRetailerUrl, {});
  }

  rejectRetailer(id: string): Observable<Object> {
    const approveRetailerUrl =
      environment.apiEndpointAdmin + '/rejectRetailer/' + id;
    return this.http.put<Object>(approveRetailerUrl, {});
  }
}

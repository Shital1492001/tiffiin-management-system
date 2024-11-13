import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { allAdminStatusResponses } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashboardService {
  // totalAdmins = {
  //   approved: 180,
  //   rejected: 40,
  //   pending: 108,
  // };

  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/pendingAdminApproval'
    );
    console.log(response);
    return response;
  }

  getRejectedRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/rejectedAdminApproval'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<allAdminStatusResponses> {
    const response = this.http.get<allAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/approvedAdminApproval'
    );
    console.log(response);
    return response;
  }

  // getTotalAdmins() {
  //   return of(this.totalAdmins);
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AllAdminStatusResponses } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashboardService {
  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<AllAdminStatusResponses> {
    const response = this.http.get<AllAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/pendingAdminApproval'
    );
    console.log(response);
    return response;
  }

  getRejectedRequests(): Observable<AllAdminStatusResponses> {
    const response = this.http.get<AllAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/rejectedAdminApproval'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllAdminStatusResponses> {
    const response = this.http.get<AllAdminStatusResponses>(
      environment.apiEndpointSuperAdmin + '/approvedAdminApproval'
    );
    console.log(response);
    return response;
  }
}

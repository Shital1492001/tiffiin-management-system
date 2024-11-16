import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllStatusResponses } from '../models/retailer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminApprovalRightsService {
  constructor(private http: HttpClient) {}
  getPendingRequests(): Observable<AllStatusResponses> {
    const response = this.http.get<AllStatusResponses>(
      environment.apiEndpointAdmin + '/pendingRetailers'
    );

    console.log('response', response);
    return response;
  }

  getRejectedRequests(): Observable<AllStatusResponses> {
    const response = this.http.get<AllStatusResponses>(
      environment.apiEndpointAdmin + '/getrejectedRetailers'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllStatusResponses> {
    const response = this.http.get<AllStatusResponses>(
      environment.apiEndpointAdmin + '/getapprovedRetailers'
    );
    return response;
  }

  getRequestsByStatus(status: string): Observable<AllStatusResponses> {
    console.log('inside getRequestsByStatus', status);
    const apiUrl = `${environment.apiEndpointAdmin}/getallRetailers?status=${status}`;
    console.log('apiUrl', apiUrl);
    return this.http.get<AllStatusResponses>(apiUrl);
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

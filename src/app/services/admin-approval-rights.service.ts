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
      environment.apiEndpoint + '/admin/pendingRetailers'
    );

    console.log('response', response);
    return response;
  }

  getRejectedRequests(): Observable<AllStatusResponses> {
    const response = this.http.get<AllStatusResponses>(
      environment.apiEndpoint + '/admin/getrejectedRetailers'
    );
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllStatusResponses> {
    const response = this.http.get<AllStatusResponses>(
      environment.apiEndpoint + '/admin/getapprovedRetailers'
    );
    return response;
  }

  getRequestsByStatus(
    status: string,
    page: number,
    limit: number
  ): Observable<AllStatusResponses> {
    console.log('inside getRequestsByStatus', status);
    const apiUrl = `${environment.apiEndpoint}/admin/getallRetailers?status=${status}&page=${page}&limit=${limit}`;
    console.log('apiUrl', apiUrl);
    return this.http.get<AllStatusResponses>(apiUrl);
  }

  approveRetailer(id: string): Observable<Object> {
    const approveRetailerUrl =
      environment.apiEndpoint + '/admin/approveRetailer/' + id;
    return this.http.put<Object>(approveRetailerUrl, {});
  }

  rejectRetailer(id: string): Observable<Object> {
    const approveRetailerUrl =
      environment.apiEndpoint + '/admin/rejectRetailer/' + id;
    return this.http.put<Object>(approveRetailerUrl, {});
  }

  searchRetailer(
    querySearch: string,
    approvalStatus: string
  ): Observable<AllStatusResponses> {
    const rejectRetailerUrl = `${environment.apiEndpoint}/admin/searchRetailer?query=${querySearch}&approval_status=${approvalStatus}`;
    return this.http.get<AllStatusResponses>(rejectRetailerUrl);
  }
}

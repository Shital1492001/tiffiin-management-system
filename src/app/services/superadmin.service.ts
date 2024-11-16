import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allAdminStatusResponses } from '../models/admin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuperadminService {
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
  getRequestsByStatus(
    status: string,
    page: number,
    limit: number
  ): Observable<allAdminStatusResponses> {
    console.log('inside getRequestsByStatus');
    // http://localhost:5000/api/superadmin/getalladminrequest?status=rejected
    const apiUrl = `${environment.apiEndpointSuperAdmin}/getalladminrequest?status=${status}&page=${page}&limit=${limit}`;
    console.log('apiUrl', apiUrl);
    return this.http.get<allAdminStatusResponses>(apiUrl);
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

  searchAdmin(
    querySearch: string,
    approvalStatus: string
  ): Observable<allAdminStatusResponses> {
    const rejectAdminUrl = `${environment.apiEndpointSuperAdmin}/searchAdminApproval?query=${querySearch}&approval_status=${approvalStatus}`;
    return this.http.get<allAdminStatusResponses>(rejectAdminUrl);
  }
}

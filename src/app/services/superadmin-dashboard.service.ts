import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AllAdminStatusResponses } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class SuperadminDashboardService {
  constructor(private http: HttpClient) { }

  getPendingRequests(): Observable<AllAdminStatusResponses> {
    const pendingUrl = environment.apiEndpoint + '/superadmin/pendingAdminApproval'
    const response = this.http.get<AllAdminStatusResponses>(pendingUrl);
    console.log(response);
    return response;
  }

  getRejectedRequests(): Observable<AllAdminStatusResponses> {
    const rejectedUrl = environment.apiEndpoint + '/superadmin/rejectedAdminApproval';
    const response = this.http.get<AllAdminStatusResponses>(rejectedUrl);
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllAdminStatusResponses> {
    const approvedUrl = environment.apiEndpoint + '/superadmin/approvedAdminApproval';
    const response = this.http.get<AllAdminStatusResponses>(approvedUrl);
    console.log(response);
    return response;
  }

  getRequestsByStatus(
    adminStatus: string,
    pageNo: number,
    limitItems: number
  ): Observable<AllAdminStatusResponses> {
    console.log('inside getRequestsByStatus');
    const param = {
      status: adminStatus,
      page: pageNo,
      limit: limitItems,
    };

    const apiUrl = `${environment.apiEndpoint}/superadmin/getalladminrequest`;
    console.log('apiUrl', apiUrl);
    return this.http.get<AllAdminStatusResponses>(apiUrl, { params: param });
  }
}

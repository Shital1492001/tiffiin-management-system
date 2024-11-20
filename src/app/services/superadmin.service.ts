import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllAdminStatusResponses } from '../models/admin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuperadminService {
  constructor(private http: HttpClient) { }

  getRequestsByStatus(
    adminStatus: string,
    pageNo: number,
    limitItems: number
  ): Observable<AllAdminStatusResponses> {
    console.log('inside getRequestsByStatus');
    const param = {
      status: adminStatus,
      page: pageNo,
      limit: limitItems
    }
    const apiUrl = `${environment.apiEndpointauth}/superadmin/getalladminrequest`;
    console.log('apiUrl', apiUrl);
    return this.http.get<AllAdminStatusResponses>(apiUrl, { params: param });
  }

  approveAdminById(id: string): Observable<Object> {
    console.log('inside approveAdminById----id with admin', id);

    const approveAdminUrl =
      environment.apiEndpointauth + '/superadmin/approveadmin/' + id;
    return this.http.put<Object>(approveAdminUrl, {});
  }
  rejectAdminById(id: string): Observable<Object> {
    console.log('inside rejectAdminById----id with admin', id);

    const rejectAdminUrl =
      environment.apiEndpointauth + '/superadmin/rejectadmin/' + id;
    return this.http.put<Object>(rejectAdminUrl, {});
  }

  searchAdmin(
    querySearch: string,
    approvalStatus: string
  ): Observable<AllAdminStatusResponses> {

    const param = {
      query: querySearch,
      approval_status: approvalStatus
    }
    const rejectAdminUrl = `${environment.apiEndpointauth}/superadmin/searchAdminApproval`
    return this.http.get<AllAdminStatusResponses>(rejectAdminUrl, { params: param });
  }
}

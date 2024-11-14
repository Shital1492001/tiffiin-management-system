import { Injectable } from '@angular/core';
import { RetailerResponse } from '../models/retailer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AllResponses } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminApprovalRightsService {
  constructor(private http: HttpClient) {}
  pendingUrl = environment.apiEndpointAdmin + '/pendingRetailers';
  rejectUrl = environment.apiEndpointAdmin + '/getrejectedRetailers';
  approvedUrl = environment.apiEndpointAdmin + '/getapprovedRetailers';
  getPendingRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(this.pendingUrl);
    console.log('response', response);
    return response;
  }
  getRejectedRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(this.rejectUrl);
    console.log(response);
    return response;
  }
  getApprovedRequests(): Observable<AllResponses> {
    const response = this.http.get<AllResponses>(this.approvedUrl);
    return response;
  }
}

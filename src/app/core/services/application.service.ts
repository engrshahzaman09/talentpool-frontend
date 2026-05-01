import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationRequest } from '../models/application.model';
import { ApiResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  applyForJob(request: ApplicationRequest): Observable<ApiResponse<Application>> {
    return this.http.post<ApiResponse<Application>>(`${this.apiUrl}`, request);
  }

  getMyApplications(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/my?page=${page}&size=${size}`);
  }

  getApplicationsByJob(jobId: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/${jobId}?page=${page}&size=${size}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobRequest } from '../models/job.model';
import { ApiResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getActiveJobs(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/public?page=${page}&size=${size}`);
  }

  searchJobs(keyword: string, location: string, jobType: string): Observable<any> {
  let url = `${this.apiUrl}/public/search?`;
  if (keyword) url += `keyword=${keyword}&`;
  if (location) url += `location=${location}&`;
  if (jobType) url += `jobType=${jobType}`;
  return this.http.get(url);
}

  getJobById(id: number): Observable<ApiResponse<Job>> {
    return this.http.get<ApiResponse<Job>>(`${this.apiUrl}/${id}`);
  }

  createJob(request: JobRequest): Observable<ApiResponse<Job>> {
    return this.http.post<ApiResponse<Job>>(`${this.apiUrl}`, request);
  }

  updateJob(id: number, request: JobRequest): Observable<ApiResponse<Job>> {
    return this.http.put<ApiResponse<Job>>(`${this.apiUrl}/${id}`, request);
  }

  closeJob(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/close`, {});
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
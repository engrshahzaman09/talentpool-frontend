import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {

  jobs: any[] = [];
  applications: any[] = [];
  currentUser: any;
  isLoading: boolean = false;
  showJobForm: boolean = false;
  selectedJobId: number | null = null;
  activeTab: string = 'jobs';

  jobForm: any = {
    title: '',
    description: '',
    location: '',
    jobType: 'FULL_TIME',
    salaryMin: null,
    salaryMax: null,
    companyId: 1,
    deadline: ''
  };

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.loadJobs();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getActiveJobs().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.jobs = response.data.content;
        }
      },
      error: () => { this.isLoading = false; }
    });
  }

  loadApplications(jobId: number): void {
    this.selectedJobId = jobId;
    this.activeTab = 'applications';
    this.applicationService.getApplicationsByJob(jobId).subscribe({
      next: (response) => {
        if (response.success) {
          this.applications = response.data.content;
        }
      }
    });
  }

  createJob(): void {
    this.jobService.createJob(this.jobForm).subscribe({
      next: (response) => {
        if (response.success) {
          this.showJobForm = false;
          this.loadJobs();
          this.resetForm();
        }
      }
    });
  }

  updateStatus(appId: number, status: string): void {
    this.applicationService.updateStatus(appId, status).subscribe({
      next: () => {
        if (this.selectedJobId) {
          this.loadApplications(this.selectedJobId);
        }
      }
    });
  }

  closeJob(id: number): void {
    this.jobService.closeJob(id).subscribe({
      next: () => this.loadJobs()
    });
  }

  resetForm(): void {
    this.jobForm = {
      title: '',
      description: '',
      location: '',
      jobType: 'FULL_TIME',
      salaryMin: null,
      salaryMax: null,
      companyId: 1,
      deadline: ''
    };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
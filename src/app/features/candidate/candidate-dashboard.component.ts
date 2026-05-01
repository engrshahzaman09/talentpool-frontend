import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { ApplicationService } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit {

  jobs: any[] = [];
  myApplications: any[] = [];
  currentUser: any;
  isLoading: boolean = false;
  activeTab: string = 'jobs';
  searchKeyword: string = '';
  searchLocation: string = '';

  showApplyModal: boolean = false;
  selectedJob: any = null;
  isApplying: boolean = false;
  applyError: string = '';
  applySuccess: string = '';

  applyForm = {
    coverLetter: ''
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

  searchJobs(): void {
    this.isLoading = true;
    this.jobService.searchJobs(this.searchKeyword, this.searchLocation, '').subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.jobs = response.data.content;
        }
      },
      error: () => {
        this.isLoading = false;
        this.loadJobs();
      }
    });
  }

  loadMyApplications(): void {
    this.activeTab = 'applications';
    this.applicationService.getMyApplications().subscribe({
      next: (response) => {
        if (response.success) {
          this.myApplications = response.data.content;
        }
      }
    });
  }

  openApplyModal(job: any): void {
    this.selectedJob = job;
    this.showApplyModal = true;
    this.applyForm.coverLetter = '';
    this.applyError = '';
    this.applySuccess = '';
  }

  closeApplyModal(): void {
    this.showApplyModal = false;
    this.selectedJob = null;
  }

  submitApplication(): void {
    if (!this.applyForm.coverLetter.trim()) {
      this.applyError = 'Please write a cover letter!';
      return;
    }

    this.isApplying = true;
    this.applyError = '';

    this.applicationService.applyForJob({
      jobId: this.selectedJob.id,
      coverLetter: this.applyForm.coverLetter
    }).subscribe({
      next: (response) => {
        this.isApplying = false;
        if (response.success) {
          this.applySuccess = 'Application submitted successfully!';
          setTimeout(() => {
            this.closeApplyModal();
          }, 2000);
        }
      },
      error: (err) => {
        this.isApplying = false;
        this.applyError = 'Already applied or an error occurred!';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
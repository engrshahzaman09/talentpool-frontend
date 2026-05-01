export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE' | 'HYBRID';
  salaryMin: number;
  salaryMax: number;
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT' | 'PAUSED';
  deadline: string;
  companyName: string;
  companyLogo?: string;
  postedByName: string;
  createdAt: string;
  totalApplications: number;
}

export interface JobRequest {
  title: string;
  description: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  companyId: number;
  deadline: string;
}
export interface Application {
  id: number;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'REJECTED' | 'HIRED';
  coverLetter: string;
  resumeUrl: string;
  appliedAt: string;
  updatedAt: string;
}

export interface ApplicationRequest {
  jobId: number;
  resumeId?: number;
  coverLetter?: string;
}
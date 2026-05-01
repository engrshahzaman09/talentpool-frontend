export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  role: 'ROLE_ADMIN' | 'ROLE_HR' | 'ROLE_CANDIDATE';
  isActive: boolean;
  createdAt: string;
}
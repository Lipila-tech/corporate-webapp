
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'SaaS' | 'Payments' | 'Enterprise' | 'Retail';
  benefits: string[];
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  commitment: string;
  startDate: string;
  compensation: string;
  requirements: string[];
  technologies?: string[];
  responsibilities?: string[];
}

export interface Customer{
  id: string;
  name: string;
  industry: string;
  logoUrl: string;
  testimonial: string;
}


export interface ApplicationFormData {
  fullName: string;
  email: string;
  roleId: string;
  portfolioUrl: string;
  githubUrl: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
}

export interface EmployeeData {
  email: string;
  role: string;
  system_role: string;
}

export interface Message{
  id: string;
  name: string;
  email: string;
  message: string;
  dateSent: string;
  status: 'new' | 'read' | 'archived';
}


export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  dateSent: string;
  status: 'new' | 'read' | 'archived';
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}
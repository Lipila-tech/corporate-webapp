
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

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  roleId: string;
  portfolioUrl: string;
  githubUrl: string;
  coverLetter: string;
}

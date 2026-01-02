import axios from 'axios';
import { ApplicationFormData, ContactMessage, Application, Employee, Customer } from '../types';

const API_URL = 'http://localhost:8000/api';

// Create an instance for global config (like Auth tokens later)
const api = axios.create({
  baseURL: API_URL,
});

export const db = {
  // Applications
  getApplications: async (): Promise<Application[]> => {
    const res = await api.get('/applications/');
    return res.data;
  },
  
  addApplication: async (appData: ApplicationFormData): Promise<Application> => {
    const res = await api.post('/applications/', appData);
    return res.data;
  },

  updateApplicationStatus: async (id: string, status: string) => {
    await api.patch(`/applications/${id}/`, { status });
  },

  // Employees
  getEmployees: async (): Promise<Employee[]> => {
    const res = await api.get('/employees/');
    return res.data;
  },

  deleteEmployee: async (id: string) => {
    await api.delete(`/employees/${id}/`);
  },

  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    const res = await api.get('/customers/');
    return res.data;
  },

  addCustomer: async (customer: Omit<Customer, 'id'>) => {
    const res = await api.post('/customers/', customer);
    return res.data;
  },

  // Auth (Simplified for now - typically use JWT)
  authenticate: async (email: string, password: string) => {
    const res = await api.post('/login/', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};
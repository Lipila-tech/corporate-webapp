import axios from 'axios';
import { ApplicationFormData, ContactMessage, Application, Employee, Customer } from '../types';

const API_URL = 'http://localhost:8000/api';

// Create an instance for global config (like Auth tokens later)
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  
  // Only add the header if we actually have a token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const db = {
  login: async (email: string, password: string) => {
    // DRF SimpleJWT expects 'username' by default. 
    // You may need to pass email as the username.
    const res = await api.post('/token/', { username: email, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res.data;
  },

  getCurrentUser: async (): Promise<Employee> => {
    const res = await api.get('/me/');
    return res.data;
  },

  // Helper to check if we have a token at all (synchronous)
  hasToken: () => !!localStorage.getItem('access_token'),

  // Applications
  getApplications: async (): Promise<Application[]> => {
    const res = await api.get('/applications/');
    return res.data;
  },
  
  addApplication: async (appData: ApplicationFormData): Promise<Application> => {
    const res = await api.post('/applications/', appData);
    return res.data;
  },

  addEmployee: async (empData: EmployeeFormData): Promise<Employee> => {
    const res = await api.post('/employees/', empData);
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
  getMessages: async (): Promise<Message[]> => {
    const res = await api.get('/messages/');
    return res.data;

  },
  addMessage: async (message: Message): Promise<Message[]> => {
    const res = await api.post('/messages/', message);
    return res.data;
  },

  addCustomer: async (customer: Omit<Customer, 'id'>) => {
    const res = await api.post('/customers/', customer);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
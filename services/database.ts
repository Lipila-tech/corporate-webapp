// database.ts
import { ApplicationFormData, Message} from '../types';

export type UserRole = 'admin' | 'viewer';

export interface Employee {
  id: string;
  name: string;
  role: string; // The job title
  systemRole: UserRole; // RBAC role
  email: string;
  password?: string;
  dateAdded: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'active' | 'lead';
}

export interface Application extends ApplicationFormData {
  id: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  dateSubmitted: string;
}

const STORAGE_KEYS = {
  APPLICATIONS: 'lipila_applications',
  EMPLOYEES: 'lipila_employees',
  CUSTOMERS: 'lipila_customers',
  MESSAGES: 'lipila_contact_messages',
  CURRENT_USER: 'lipila_current_user'
};

const getStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const seedInitialAdmin = () => {
  const employees = getStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, []);

  const adminExists = employees.some(
    e => e.email === 'admin@lipila.co.zm'
  );

  if (!adminExists) {
    const defaultAdmin: Employee = {
      id: 'admin-001',
      name: 'System Admin',
      role: 'Administrator',
      systemRole: 'admin',
      email: 'admin@lipila.co.zm',
      password: 'password123',
      dateAdded: new Date().toISOString()
    };

    setStorage(STORAGE_KEYS.EMPLOYEES, [...employees, defaultAdmin]);
  }
};

seedInitialAdmin();
export const db = {
  // Applications
  getApplications: (): Application[] => getStorage(STORAGE_KEYS.APPLICATIONS, []),
  addApplication: (appData: ApplicationFormData) => {
    const apps = db.getApplications();
    const newApp: Application = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      dateSubmitted: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.APPLICATIONS, [...apps, newApp]);
    return newApp;
  },
  updateApplicationStatus: (id: string, status: Application['status']) => {
    const apps = db.getApplications().map(app => 
      app.id === id ? { ...app, status } : app
    );
    setStorage(STORAGE_KEYS.APPLICATIONS, apps);
  },

  // Employees
  getEmployees: (): Employee[] => getStorage(STORAGE_KEYS.EMPLOYEES, []),
  addEmployee: (employee: Omit<Employee, 'id' | 'dateAdded'>) => {
    const employees = db.getEmployees();
    const newEmployee: Employee = {
      ...employee,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.EMPLOYEES, [...employees, newEmployee]);
    return newEmployee;
  },
  deleteEmployee: (id: string) => {
    const employees = db.getEmployees().filter(e => e.id !== id);
    setStorage(STORAGE_KEYS.EMPLOYEES, employees);
  },

  // Customers
  getCustomers: (): Customer[] => getStorage(STORAGE_KEYS.CUSTOMERS, []),
  addCustomer: (customer: Omit<Customer, 'id'>) => {
    const customers = db.getCustomers();
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9)
    };
    setStorage(STORAGE_KEYS.CUSTOMERS, [...customers, newCustomer]);
    return newCustomer;
  },
  deleteCustomer: (id: string) => {
    const customers = db.getCustomers().filter(c => c.id !== id);
    setStorage(STORAGE_KEYS.CUSTOMERS, customers);
  },

  // Contact Messages
  getMessages: (): ContactMessage[] => getStorage(STORAGE_KEYS.MESSAGES, []),
  addMessage: (msg: { name: string; email: string; message: string }) => {
    const messages = db.getMessages();
    const newMessage: Message= {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      dateSent: new Date().toISOString(),
      status: 'new'
    };
    setStorage(STORAGE_KEYS.MESSAGES, [newMessage, ...messages]);
    return newMessage;
  },
  updateMessageStatus: (id: string, status: ContactMessage['status']) => {
    const messages = db.getMessages().map(m => 
      m.id === id ? { ...m, status } : m
    );
    setStorage(STORAGE_KEYS.MESSAGES, messages);
  },
  deleteMessage: (id: string) => {
    const messages = db.getMessages().filter(m => m.id !== id);
    setStorage(STORAGE_KEYS.MESSAGES, messages);
  },

  // Auth
  // Added helper to check if user is logged in to resolve error in App.tsx
  isAdminLoggedIn: (): boolean => !!db.getCurrentUser(),
  getCurrentUser: (): Employee | null => getStorage(STORAGE_KEYS.CURRENT_USER, null),
  authenticate: (email: string, password: string): Employee | null => {
    const employees = db.getEmployees();
    const user = employees.find(e => e.email === email && e.password === password);
    if (user) {
      setStorage(STORAGE_KEYS.CURRENT_USER, user);
      return user;
    }
    return null;
  },
  logout: () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
};

import { Employee, UserRole } from './database';

const STORAGE_KEYS = {
  EMPLOYEES: 'lipila_employees',
  CURRENT_USER: 'lipila_current_user'
};

/* ------------------ helpers ------------------ */

const getStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* ------------------ admin seed ------------------ */

const DEFAULT_ADMIN: Employee = {
  id: 'admin-001',
  name: 'System Admin',
  role: 'Administrator',
  systemRole: 'admin',
  email: 'admin@lipila.co.zm',
  password: 'password123',
  dateAdded: new Date().toISOString()
};

const ensureAdminExists = () => {
  const employees = getStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, []);

  const adminExists = employees.some(
    e => e.email.toLowerCase() === DEFAULT_ADMIN.email
  );

  if (!adminExists) {
    setStorage(STORAGE_KEYS.EMPLOYEES, [...employees, DEFAULT_ADMIN]);
  }
};

/* ------------------ Auth Service ------------------ */

class AuthService {
  constructor() {
    ensureAdminExists();
  }

  login(email: string, password: string): Employee | null {
    const employees = getStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, []);

    const user = employees.find(
      e =>
        e.email.toLowerCase() === email.trim().toLowerCase() &&
        e.password === password
    );

    if (!user) return null;

    setStorage(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  getCurrentUser(): Employee | null {
    return getStorage<Employee | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.systemRole === 'admin';
  }
}

export const authService = new AuthService();

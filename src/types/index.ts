// Frontend Types and Interfaces

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// User Types
export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: 'admin' | 'staff' | 'customer';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  phone: string;
  password: string;
  full_name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Customer Types
export interface Customer {
  id: number;
  user_id?: number;
  customer_code: string;
  address?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  loyalty_points: number;
  total_spent: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Vehicle Types
export interface Vehicle {
  id: number;
  customer_id: number;
  license_plate: string;
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  engine_number?: string;
  chassis_number?: string;
  mileage?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Service Types
export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  category_id?: number;
  category?: ServiceCategory;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  duration_minutes?: number;
  image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Appointment Types
export interface Appointment {
  id: number;
  appointment_code: string;
  customer_id?: number;
  customer?: Customer;
  vehicle_id?: number;
  vehicle?: Vehicle;
  service_id?: number;
  service?: Service;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentRequest {
  customer_id?: number;
  vehicle_id?: number;
  service_id?: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  customer_info?: {
    full_name: string;
    phone: string;
    email?: string;
  };
  vehicle_info?: {
    license_plate: string;
    brand?: string;
    model?: string;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'time' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface TableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
  loading?: boolean;
  pagination?: {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  roles?: string[];
}

// Dashboard Types
export interface DashboardStats {
  totalAppointments: number;
  completedRepairs: number;
  totalRevenue: number;
  activeCustomers: number;
  appointmentsToday: number;
  pendingRepairs: number;
}

// Search and Filter Types
export interface SearchFilters {
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  category?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Hook Types
export interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<any>;
  reset: () => void;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Theme Types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Export commonly used React types
export type { ReactNode, ReactElement, ComponentType } from 'react';
export type CustomerStatus = 'active' | 'inactive' | 'lead';
export type CustomerPlan = 'starter' | 'growth' | 'enterprise';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  mrr: number;
  createdAt: string;
}

export type CustomerSortField = 'name' | 'company' | 'createdAt' | 'mrr';
export type SortDirection = 'asc' | 'desc';

export interface CustomersFilters {
  search: string;
  status: CustomerStatus | 'all';
  plan: CustomerPlan | 'all';
  page: number;
  pageSize: number;
  sortBy: CustomerSortField;
  sortDirection: SortDirection;
}

export interface CustomersListResponse {
  items: Customer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateCustomerInput {
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  mrr: number;
}

export interface UpdateCustomerInput extends CreateCustomerInput {
  id: string;
}

export interface OverviewStats {
  totalCustomers: number;
  activeCustomers: number;
  monthlyRevenue: number;
  enterpriseCustomers: number;
}

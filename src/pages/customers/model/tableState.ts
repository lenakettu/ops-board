import type {
  CustomerPlan,
  CustomersFilters,
  CustomerStatus,
} from '@/entities/customer/model/types';

export const defaultCustomersFilters: CustomersFilters = {
  search: '',
  status: 'all',
  plan: 'all',
  page: 1,
  pageSize: 10,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

export function updateSearch(prev: CustomersFilters, search: string): CustomersFilters {
  return {
    ...prev,
    search,
    page: 1,
  };
}

export function updateStatus(
  prev: CustomersFilters,
  status: CustomerStatus | 'all',
): CustomersFilters {
  return {
    ...prev,
    status,
    page: 1,
  };
}

export function updatePlan(prev: CustomersFilters, plan: CustomerPlan | 'all'): CustomersFilters {
  return {
    ...prev,
    plan,
    page: 1,
  };
}

export function updatePage(prev: CustomersFilters, page: number): CustomersFilters {
  return {
    ...prev,
    page,
  };
}

export function resetFilters(): CustomersFilters {
  return defaultCustomersFilters;
}

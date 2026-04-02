import type { CustomersFilters } from '@/entities/customer/model/types';

export const defaultCustomersFilters: CustomersFilters = {
  search: '',
  status: 'all',
  plan: 'all',
  page: 1,
  pageSize: 5,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

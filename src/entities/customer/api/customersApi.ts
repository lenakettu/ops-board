import { fakeDelay } from '@/shared/api/fakeDelay';
import { HttpError } from '@/shared/api/httpError';
import {
  getCustomerFromDb,
  getCustomersDb,
  insertCustomerToDb,
  updateCustomerInDb,
} from '@/shared/api/mockDb';

import type {
  CreateCustomerInput,
  Customer,
  CustomersFilters,
  CustomersListResponse,
  CustomerSortField,
  OverviewStats,
  SortDirection,
  UpdateCustomerInput,
} from '../model/types';

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

function compareStrings(left: string, right: string, direction: SortDirection): number {
  const result = left.localeCompare(right);

  return direction === 'asc' ? result : -result;
}

function compareNumbers(left: number, right: number, direction: SortDirection): number {
  const result = left - right;

  return direction === 'asc' ? result : -result;
}

function compareDates(left: string, right: string, direction: SortDirection): number {
  const leftTime = new Date(left).getTime();
  const rightTime = new Date(right).getTime();

  return compareNumbers(leftTime, rightTime, direction);
}

function sortCustomers(
  items: Customer[],
  sortBy: CustomerSortField,
  sortDirection: SortDirection,
): Customer[] {
  const sorted = [...items];

  sorted.sort((left, right) => {
    if (sortBy === 'name') {
      return compareStrings(left.name, right.name, sortDirection);
    }

    if (sortBy === 'company') {
      return compareStrings(left.company, right.company, sortDirection);
    }

    if (sortBy === 'mrr') {
      return compareNumbers(left.mrr, right.mrr, sortDirection);
    }

    return compareDates(left.createdAt, right.createdAt, sortDirection);
  });

  return sorted;
}

function filterCustomers(items: Customer[], filters: CustomersFilters): Customer[] {
  const search = normalizeSearch(filters.search);

  return items.filter((customer) => {
    const matchesSearch =
      search.length === 0 ||
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.company.toLowerCase().includes(search);

    const matchesStatus = filters.status === 'all' || customer.status === filters.status;
    const matchesPlan = filters.plan === 'all' || customer.plan === filters.plan;

    return matchesSearch && matchesStatus && matchesPlan;
  });
}

function paginateCustomers(
  items: Customer[],
  page: number,
  pageSize: number,
): CustomersListResponse {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: items.slice(startIndex, endIndex),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

function buildCustomerId(): string {
  return `cus_${crypto.randomUUID().slice(0, 8)}`;
}

function mapInputToCustomer(input: CreateCustomerInput): Customer {
  return {
    id: buildCustomerId(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company.trim(),
    status: input.status,
    plan: input.plan,
    mrr: input.mrr,
    createdAt: new Date().toISOString(),
  };
}

function mapUpdatedCustomer(current: Customer, input: UpdateCustomerInput): Customer {
  return {
    ...current,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: input.company.trim(),
    status: input.status,
    plan: input.plan,
    mrr: input.mrr,
  };
}

export async function getCustomers(filters: CustomersFilters): Promise<CustomersListResponse> {
  await fakeDelay();

  const customers = getCustomersDb();
  const filteredCustomers = filterCustomers(customers, filters);
  const sortedCustomers = sortCustomers(filteredCustomers, filters.sortBy, filters.sortDirection);

  return paginateCustomers(sortedCustomers, filters.page, filters.pageSize);
}

export async function getCustomerById(id: string): Promise<Customer> {
  await fakeDelay(400);

  const customer = getCustomerFromDb(id);

  if (!customer) {
    throw new HttpError('Customer not found', 404);
  }

  return customer;
}

export async function createCustomer(input: CreateCustomerInput): Promise<Customer> {
  await fakeDelay(500);

  const customers = getCustomersDb();
  const emailExists = customers.some(
    (customer) => customer.email.toLowerCase() === input.email.trim().toLowerCase(),
  );

  if (emailExists) {
    throw new HttpError('Customer with this email already exists', 409);
  }

  const customer = mapInputToCustomer(input);
  insertCustomerToDb(customer);

  return customer;
}

export async function updateCustomer(input: UpdateCustomerInput): Promise<Customer> {
  await fakeDelay(500);

  const currentCustomer = getCustomerFromDb(input.id);

  if (!currentCustomer) {
    throw new HttpError('Customer not found', 404);
  }

  const customers = getCustomersDb();
  const emailExists = customers.some(
    (customer) =>
      customer.id !== input.id && customer.email.toLowerCase() === input.email.trim().toLowerCase(),
  );

  if (emailExists) {
    throw new HttpError('Customer with this email already exists', 409);
  }

  const updatedCustomer = mapUpdatedCustomer(currentCustomer, input);
  updateCustomerInDb(updatedCustomer);

  return updatedCustomer;
}

export async function getOverviewStats(): Promise<OverviewStats> {
  await fakeDelay(350);

  const customers = getCustomersDb();

  return {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((customer) => customer.status === 'active').length,
    monthlyRevenue: customers.reduce((sum, customer) => sum + customer.mrr, 0),
    enterpriseCustomers: customers.filter((customer) => customer.plan === 'enterprise').length,
  };
}

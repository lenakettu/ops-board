import type { Customer } from '@/entities/customer/model/types';

const initialCustomers: Customer[] = [
  {
    id: 'cus_001',
    name: 'Olivia Martin',
    email: 'olivia@northstar.io',
    company: 'Northstar Labs',
    status: 'active',
    plan: 'enterprise',
    mrr: 2400,
    createdAt: '2025-10-12T09:15:00.000Z',
  },
  {
    id: 'cus_002',
    name: 'Ethan Walker',
    email: 'ethan@flowpeak.co',
    company: 'FlowPeak',
    status: 'active',
    plan: 'growth',
    mrr: 790,
    createdAt: '2025-11-03T12:20:00.000Z',
  },
  {
    id: 'cus_003',
    name: 'Sophia Lee',
    email: 'sophia@brightpath.ai',
    company: 'BrightPath AI',
    status: 'lead',
    plan: 'starter',
    mrr: 0,
    createdAt: '2026-01-16T08:40:00.000Z',
  },
  {
    id: 'cus_004',
    name: 'Noah Davis',
    email: 'noah@axonworks.com',
    company: 'AxonWorks',
    status: 'inactive',
    plan: 'growth',
    mrr: 0,
    createdAt: '2025-09-28T14:00:00.000Z',
  },
  {
    id: 'cus_005',
    name: 'Emma Thompson',
    email: 'emma@horizon.one',
    company: 'Horizon One',
    status: 'active',
    plan: 'enterprise',
    mrr: 3100,
    createdAt: '2025-08-19T10:00:00.000Z',
  },
  {
    id: 'cus_006',
    name: 'Liam Johnson',
    email: 'liam@coregrid.dev',
    company: 'CoreGrid',
    status: 'active',
    plan: 'starter',
    mrr: 190,
    createdAt: '2026-02-04T11:10:00.000Z',
  },
  {
    id: 'cus_007',
    name: 'Ava Wilson',
    email: 'ava@signalforge.io',
    company: 'SignalForge',
    status: 'lead',
    plan: 'growth',
    mrr: 0,
    createdAt: '2026-02-14T15:30:00.000Z',
  },
  {
    id: 'cus_008',
    name: 'James Brown',
    email: 'james@lumencloud.net',
    company: 'LumenCloud',
    status: 'active',
    plan: 'growth',
    mrr: 1240,
    createdAt: '2025-12-01T13:45:00.000Z',
  },
  {
    id: 'cus_009',
    name: 'Isabella Harris',
    email: 'isabella@vectorlane.com',
    company: 'VectorLane',
    status: 'inactive',
    plan: 'starter',
    mrr: 0,
    createdAt: '2025-07-11T09:00:00.000Z',
  },
  {
    id: 'cus_010',
    name: 'Benjamin Clark',
    email: 'benjamin@novasync.app',
    company: 'NovaSync',
    status: 'active',
    plan: 'enterprise',
    mrr: 4200,
    createdAt: '2025-06-07T16:15:00.000Z',
  },
  {
    id: 'cus_011',
    name: 'Mia Lewis',
    email: 'mia@pixeltrail.co',
    company: 'PixelTrail',
    status: 'lead',
    plan: 'starter',
    mrr: 0,
    createdAt: '2026-03-02T10:20:00.000Z',
  },
  {
    id: 'cus_012',
    name: 'Lucas Young',
    email: 'lucas@atlasmetrics.io',
    company: 'Atlas Metrics',
    status: 'active',
    plan: 'growth',
    mrr: 980,
    createdAt: '2025-11-25T17:00:00.000Z',
  },
];

let customersDb: Customer[] = [...initialCustomers];

export function getCustomersDb(): Customer[] {
  return [...customersDb];
}

export function getCustomerFromDb(id: string): Customer | undefined {
  return customersDb.find((customer) => customer.id === id);
}

export function insertCustomerToDb(customer: Customer): void {
  customersDb = [customer, ...customersDb];
}

export function updateCustomerInDb(updatedCustomer: Customer): void {
  customersDb = customersDb.map((customer) =>
    customer.id === updatedCustomer.id ? updatedCustomer : customer,
  );
}

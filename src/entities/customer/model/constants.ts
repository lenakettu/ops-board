import type { CustomerPlan, CustomerStatus } from './types';

export const customerStatusOptions: Array<{ value: CustomerStatus; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'lead', label: 'Lead' },
];

export const customerPlanOptions: Array<{ value: CustomerPlan; label: string }> = [
  { value: 'starter', label: 'Starter' },
  { value: 'growth', label: 'Growth' },
  { value: 'enterprise', label: 'Enterprise' },
];

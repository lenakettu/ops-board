import type {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from '@/entities/customer/model/types';

export type CustomerFormValues = CreateCustomerInput;

export const emptyCustomerFormValues: CustomerFormValues = {
  name: '',
  email: '',
  company: '',
  status: 'lead',
  plan: 'starter',
  mrr: 0,
};

export function getCustomerFormDefaultValues(customer: Customer): CustomerFormValues {
  return {
    name: customer.name,
    email: customer.email,
    company: customer.company,
    status: customer.status,
    plan: customer.plan,
    mrr: customer.mrr,
  };
}

export function mapCustomerFormToCreateInput(values: CustomerFormValues): CreateCustomerInput {
  return {
    ...values,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    company: values.company.trim(),
    mrr: Number(values.mrr),
  };
}

export function mapCustomerFormToUpdateInput(
  customerId: string,
  values: CustomerFormValues,
): UpdateCustomerInput {
  return {
    id: customerId,
    ...mapCustomerFormToCreateInput(values),
  };
}

export const customerFormValidationRules = {
  name: {
    required: 'Name is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Enter a valid email',
    },
  },
  company: {
    required: 'Company is required',
  },
  mrr: {
    valueAsNumber: true,
    min: {
      value: 0,
      message: 'MRR cannot be negative',
    },
  },
};

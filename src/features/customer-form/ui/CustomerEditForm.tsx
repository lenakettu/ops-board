import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { updateCustomer } from '@/entities/customer/api/customersApi';
import {
  customerPlanOptions,
  customerStatusOptions,
} from '@/entities/customer/model/constants';
import type { Customer, UpdateCustomerInput } from '@/entities/customer/model/types';

import styles from './CustomerEditForm.module.css';

interface CustomerEditFormProps {
  customer: Customer;
  onCancel: () => void;
  onSuccess: () => void;
}

type CustomerEditFormValues = Omit<UpdateCustomerInput, 'id'>;

export function CustomerEditForm({ customer, onCancel, onSuccess }: CustomerEditFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CustomerEditFormValues>({
    defaultValues: {
      name: customer.name,
      email: customer.email,
      company: customer.company,
      status: customer.status,
      plan: customer.plan,
      mrr: customer.mrr,
    },
  });

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['customer', customer.id] });
      void queryClient.invalidateQueries({ queryKey: ['customers'] });
      onSuccess();
    },
  });

  function onSubmit(values: CustomerEditFormValues) {
    mutation.mutate({
      id: customer.id,
      ...values,
      mrr: Number(values.mrr),
    });
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Edit customer</h2>
        <p className={styles.description}>{customer.company}</p>
      </div>

      <div className={styles.details}>
        <label className={styles.row}>
          <span className={styles.label}>Name</span>
          <div>
            <input
              className={styles.input}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name ? <p className={styles.error}>{errors.name.message}</p> : null}
          </div>
        </label>

        <label className={styles.row}>
          <span className={styles.label}>Email</span>
          <div>
            <input
              className={styles.input}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email ? <p className={styles.error}>{errors.email.message}</p> : null}
          </div>
        </label>

        <label className={styles.row}>
          <span className={styles.label}>Company</span>
          <div>
            <input
              className={styles.input}
              {...register('company', { required: 'Company is required' })}
            />
            {errors.company ? <p className={styles.error}>{errors.company.message}</p> : null}
          </div>
        </label>

        <label className={styles.row}>
          <span className={styles.label}>Status</span>
          <select className={styles.input} {...register('status')}>
            {customerStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.row}>
          <span className={styles.label}>Plan</span>
          <select className={styles.input} {...register('plan')}>
            {customerPlanOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.row}>
          <span className={styles.label}>MRR</span>
          <div>
            <input
              className={styles.input}
              type="number"
              min="0"
              {...register('mrr', {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'MRR cannot be negative',
                },
              })}
            />
            {errors.mrr ? <p className={styles.error}>{errors.mrr.message}</p> : null}
          </div>
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={onCancel}>
          Cancel
        </button>

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={mutation.isPending || !isDirty}
        >
          {mutation.isPending ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { updateCustomer } from '@/entities/customer/api/customersApi';
import type { Customer } from '@/entities/customer/model/types';
import { CustomerFormFields } from '@/features/customer-form';
import {
  type CustomerFormValues,
  getCustomerFormDefaultValues,
  mapCustomerFormToUpdateInput,
} from '@/features/customer-form/model/customerForm';
import { useToast } from '@/shared/ui/toast';

import styles from './CustomerEditForm.module.css';

interface CustomerEditFormProps {
  customer: Customer;
  onCancel: () => void;
  onSuccess: () => void;
}

export function CustomerEditForm({ customer, onCancel, onSuccess }: CustomerEditFormProps) {
  const queryClient = useQueryClient();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<CustomerFormValues>({
    defaultValues: getCustomerFormDefaultValues(customer),
  });

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['customer', customer.id] });
      void queryClient.invalidateQueries({ queryKey: ['customers'] });
      void queryClient.invalidateQueries({ queryKey: ['overview-stats'] });

      toast.success('Customer updated successfully');
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to update customer');
    },
  });

  function onSubmit(values: CustomerFormValues) {
    mutation.mutate(mapCustomerFormToUpdateInput(customer.id, values));
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

      <CustomerFormFields register={register} control={control} errors={errors} />

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

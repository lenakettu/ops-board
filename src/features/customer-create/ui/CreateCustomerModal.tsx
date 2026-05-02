import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { createCustomer } from '@/entities/customer/api/customersApi';
import {
  CustomerFormFields,
  type CustomerFormValues,
  emptyCustomerFormValues,
  mapCustomerFormToCreateInput,
} from '@/features/customer-form';
import { useToast } from '@/shared/ui/toast';

import styles from './CreateCustomerModal.module.css';

interface CreateCustomerModalProps {
  onClose: () => void;
}

export function CreateCustomerModal({ onClose }: CreateCustomerModalProps) {
  const queryClient = useQueryClient();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<CustomerFormValues>({
    defaultValues: emptyCustomerFormValues,
  });

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['customers'] });
      void queryClient.invalidateQueries({ queryKey: ['overview-stats'] });

      toast.success('Customer created successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create customer');
    },
  });

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  function onSubmit(values: CustomerFormValues) {
    mutation.mutate(mapCustomerFormToCreateInput(values));
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-customer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form
          className={styles.form}
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
        >
          <div>
            <h2 id="create-customer-title" className={styles.title}>
              Add customer
            </h2>
            <p className={styles.description}>Create a new customer account.</p>
          </div>

          <CustomerFormFields register={register} control={control} errors={errors} />

          {mutation.isError ? (
            <p className={styles.formError}>Customer with this email already exists.</p>
          ) : null}

          <div className={styles.actions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={mutation.isPending || !isDirty}
            >
              {mutation.isPending ? 'Creating...' : 'Create customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

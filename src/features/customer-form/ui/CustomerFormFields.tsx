import { type Control, Controller, type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { customerPlanOptions, customerStatusOptions } from '@/entities/customer/model/constants';
import { customerFormValidationRules, type CustomerFormValues } from '@/features/customer-form';
import { SingleSelect } from '@/shared/ui/select';

import styles from './CustomerFormFields.module.css';

interface CustomerFormFieldsProps {
  register: UseFormRegister<CustomerFormValues>;
  control: Control<CustomerFormValues>;
  errors: FieldErrors<CustomerFormValues>;
}

export function CustomerFormFields({ register, errors, control }: CustomerFormFieldsProps) {
  return (
    <div className={styles.details}>
      <label className={styles.row}>
        <span className={styles.label}>Name</span>
        <div>
          <input className={styles.input} {...register('name', customerFormValidationRules.name)} />
          {errors.name ? <p className={styles.error}>{errors.name.message}</p> : null}
        </div>
      </label>

      <label className={styles.row}>
        <span className={styles.label}>Email</span>
        <div>
          <input
            className={styles.input}
            {...register('email', customerFormValidationRules.email)}
          />
          {errors.email ? <p className={styles.error}>{errors.email.message}</p> : null}
        </div>
      </label>

      <label className={styles.row}>
        <span className={styles.label}>Company</span>
        <div>
          <input
            className={styles.input}
            {...register('company', customerFormValidationRules.company)}
          />
          {errors.company ? <p className={styles.error}>{errors.company.message}</p> : null}
        </div>
      </label>

      <label className={styles.row}>
        <span className={styles.label}>Status</span>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SingleSelect
              options={customerStatusOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </label>

      <label className={styles.row}>
        <span className={styles.label}>Plan</span>
        <Controller
          control={control}
          name="plan"
          render={({ field }) => (
            <SingleSelect
              options={customerPlanOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </label>

      <label className={styles.row}>
        <span className={styles.label}>MRR</span>
        <div>
          <input
            className={styles.input}
            type="number"
            min="0"
            {...register('mrr', customerFormValidationRules.mrr)}
          />
          {errors.mrr ? <p className={styles.error}>{errors.mrr.message}</p> : null}
        </div>
      </label>
    </div>
  );
}

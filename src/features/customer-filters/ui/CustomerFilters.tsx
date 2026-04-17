import { customerPlanOptions, customerStatusOptions } from '@/entities/customer/model/constants';
import type {
  CustomerPlan,
  CustomersFilters,
  CustomerStatus,
} from '@/entities/customer/model/types';

import styles from './CustomerFilters.module.css';

export interface CustomerFiltersProps {
  filters: CustomersFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatus | 'all') => void;
  onPlanChange: (value: CustomerPlan | 'all') => void;
  onReset: () => void;
}

function isCustomerStatus(value: string): value is CustomerStatus {
  return value === 'active' || value === 'inactive' || value === 'lead';
}

function isCustomerPlan(value: string): value is CustomerPlan {
  return value === 'starter' || value === 'growth' || value === 'enterprise';
}

export function CustomerFilters({
  filters,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onReset,
}: CustomerFiltersProps) {
  function handleStatusChange(value: string) {
    if (value === 'all') {
      onStatusChange('all');
      return;
    }

    if (isCustomerStatus(value)) {
      onStatusChange(value);
    }
  }

  function handlePlanChange(value: string) {
    if (value === 'all') {
      onPlanChange('all');
      return;
    }

    if (isCustomerPlan(value)) {
      onPlanChange(value);
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Search by name, email or company..."
        value={filters.search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        className={styles.select}
        value={filters.status}
        onChange={(event) => handleStatusChange(event.target.value)}
      >
        <option value="all">All statuses</option>
        {customerStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.plan}
        onChange={(event) => handlePlanChange(event.target.value)}
      >
        <option value="all">All plans</option>
        {customerPlanOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button type="button" className={styles.reset} onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

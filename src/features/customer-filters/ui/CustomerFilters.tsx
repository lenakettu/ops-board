import { customerPlanOptions, customerStatusOptions } from '@/entities/customer/model/constants';
import type {
  CustomerPlan,
  CustomersFilters,
  CustomerStatus,
} from '@/entities/customer/model/types';
import { MultiSelect } from '@/shared/ui/select';

import styles from './CustomerFilters.module.css';

export interface CustomerFiltersProps {
  filters: CustomersFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatus[]) => void;
  onPlanChange: (value: CustomerPlan[]) => void;
  onReset: () => void;
}

export function CustomerFilters({
  filters,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onReset,
}: CustomerFiltersProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Search by name, email or company..."
        value={filters.search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <MultiSelect
        options={customerStatusOptions}
        value={filters.status}
        onChange={onStatusChange}
        placeholder="All statuses"
      />

      <MultiSelect
        options={customerPlanOptions}
        value={filters.plan}
        onChange={onPlanChange}
        placeholder="All plans"
      />

      <button type="button" className={styles.reset} onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

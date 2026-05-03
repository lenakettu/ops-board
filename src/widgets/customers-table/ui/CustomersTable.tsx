import type { Customer } from '@/entities/customer/model/types';
import { CustomersTableHead } from '@/widgets/customers-table/ui/CustomersTableHead.tsx';
import { CustomersTableRow } from '@/widgets/customers-table/ui/CustomersTableRow.tsx';
import { CustomersTableSkeleton } from '@/widgets/customers-table/ui/CustomersTableSkeleton.tsx';
import { CustomersTableState } from '@/widgets/customers-table/ui/CustomersTableState.tsx';

import styles from './CustomersTable.module.css';

export type CustomersTableState = 'loading' | 'error' | 'empty' | 'success';

interface CustomersTableProps {
  items: Customer[];
  state: CustomersTableState;
  hasActiveFilters: boolean;
}

export function CustomersTable({ items, state, hasActiveFilters }: CustomersTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <CustomersTableHead />

        <tbody>{renderCustomersTableBody(state, items, hasActiveFilters)}</tbody>
      </table>
    </div>
  );
}

function renderCustomersTableBody(
  state: CustomersTableState,
  items: Customer[],
  hasActiveFilters: boolean,
) {
  switch (state) {
    case 'loading':
      return <CustomersTableSkeleton />;

    case 'error':
      return (
        <CustomersTableState
          title="Failed to load customers"
          description="Please try again later."
        />
      );

    case 'empty':
      return (
        <CustomersTableState
          title={hasActiveFilters ? 'No customers found' : 'No customers yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting your filters or search query.'
              : 'Create your first customer to get started.'
          }
        />
      );

    case 'success':
      return items.map((customer) => <CustomersTableRow key={customer.id} customer={customer} />);
  }
}

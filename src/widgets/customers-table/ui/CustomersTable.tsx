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
}

export function CustomersTable({ items, state }: CustomersTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <CustomersTableHead />

        <tbody>{renderCustomersTableBody(state, items)}</tbody>
      </table>
    </div>
  );
}

function renderCustomersTableBody(state: CustomersTableState, items: Customer[]) {
  switch (state) {
    case 'loading':
      return <CustomersTableSkeleton />;

    case 'error':
      return <CustomersTableState message="Failed to load customers." />;

    case 'empty':
      return <CustomersTableState message="No customers found." />;

    case 'success':
      return items.map((customer) => <CustomersTableRow key={customer.id} customer={customer} />);
  }
}

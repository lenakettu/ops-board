import { Link } from 'react-router-dom';

import type { Customer } from '@/entities/customer/model/types';

import styles from './CustomersTable.module.css';

export interface CustomersTableProps {
  items: Customer[];

  isLoading: boolean;
  isError: boolean;
}

function getStatusClassName(status: 'active' | 'inactive' | 'lead'): string {
  if (status === 'active') {
    return `${styles.status} ${styles.statusActive}`;
  }

  if (status === 'inactive') {
    return `${styles.status} ${styles.statusInactive}`;
  }

  return `${styles.status} ${styles.statusLead}`;
}

export function CustomersTable({ items, isLoading, isError }: CustomersTableProps) {
  if (isLoading) {
    return <div className={styles.state}>Loading customers...</div>;
  }

  if (isError) {
    return <div className={styles.state}>Failed to load customers.</div>;
  }

  if (items.length === 0) {
    return <div className={styles.state}>No customers found.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th className={styles.headCell}>Customer</th>
            <th className={styles.headCell}>Email</th>
            <th className={styles.headCell}>Status</th>
            <th className={styles.headCell}>Plan</th>
            <th className={styles.headCell}>MRR</th>
            <th className={styles.headCell}>Created</th>
          </tr>
        </thead>

        <tbody>
          {items.map((customer) => (
            <tr key={customer.id} className={styles.row}>
              <td className={`${styles.cell} ${styles.customerCell}`}>
                <Link to={`/customers/${customer.id}`} className={styles.name}>
                  {customer.name}
                </Link>
                <div className={styles.company}>{customer.company}</div>
              </td>

              <td className={styles.cell}>
                <span className={styles.email}>{customer.email}</span>
              </td>

              <td className={styles.cell}>
                <span className={getStatusClassName(customer.status)}>{customer.status}</span>
              </td>

              <td className={styles.cell}>
                <span className={styles.plan}>{customer.plan}</span>
              </td>

              <td className={styles.cell}>
                <span className={styles.mrr}>${customer.mrr.toLocaleString()}</span>
              </td>

              <td className={styles.cell}>
                <span className={styles.created}>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

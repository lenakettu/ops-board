import { Link } from 'react-router-dom';

import { CustomerStatusBadge } from '@/entities/customer';
import type { Customer } from '@/entities/customer/model/types.ts';
import styles from '@/widgets/customers-table/ui/CustomersTable.module.css';

export function CustomersTableRow({ customer }: { customer: Customer }) {
  return (
    <tr className={styles.row}>
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
        <CustomerStatusBadge status={customer.status} />
      </td>

      <td className={styles.cell}>
        <span className={styles.plan}>{customer.plan}</span>
      </td>

      <td className={styles.cell}>
        <span className={styles.mrr}>${customer.mrr.toLocaleString()}</span>
      </td>

      <td className={styles.cell}>
        <span className={styles.created}>{new Date(customer.createdAt).toLocaleDateString()}</span>
      </td>
    </tr>
  );
}

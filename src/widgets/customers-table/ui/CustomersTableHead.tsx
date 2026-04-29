import styles from '@/widgets/customers-table/ui/CustomersTable.module.css';

export function CustomersTableHead() {
  return (
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
  );
}

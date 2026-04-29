import styles from '@/widgets/customers-table/ui/CustomersTable.module.css';

const COLUMNS_COUNT = 6;

export function CustomersTableState({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={COLUMNS_COUNT} className={styles.state}>
        {message}
      </td>
    </tr>
  );
}

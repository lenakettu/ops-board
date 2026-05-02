import styles from '@/widgets/customers-table/ui/CustomersTable.module.css';

const COLUMNS_COUNT = 6;

interface CustomersTableStateProps {
  title: string;
  description?: string;
}

export function CustomersTableState({ title, description }: CustomersTableStateProps) {
  return (
    <tr>
      <td colSpan={COLUMNS_COUNT} className={styles.state}>
        <div className={styles.stateContent}>
          <p className={styles.stateTitle}>{title}</p>

          {description ? <p className={styles.stateDescription}>{description}</p> : null}
        </div>
      </td>
    </tr>
  );
}

import { Skeleton } from '@/shared/ui/skeleton/Skeleton.tsx';
import styles from '@/widgets/customers-table/ui/CustomersTable.module.css';

const SKELETON_ROWS = 6;

export function CustomersTableSkeleton() {
  return Array.from({ length: SKELETON_ROWS }).map((_, index) => (
    <tr key={index} className={styles.row}>
      <td className={styles.cell}>
        <Skeleton width={140} />
      </td>
      <td className={styles.cell}>
        <Skeleton width={180} />
      </td>
      <td className={styles.cell}>
        <Skeleton width={80} />
      </td>
      <td className={styles.cell}>
        <Skeleton width={80} />
      </td>
      <td className={styles.cell}>
        <Skeleton width={60} />
      </td>
      <td className={styles.cell}>
        <Skeleton width={100} />
      </td>
    </tr>
  ));
}

import styles from '@/pages/customer-details/ui/CustomerDetailsPage.module.css';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton.tsx';

const DETAILS_SKELETON_ROWS = 5;

export function CustomerDetailsSkeleton() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <Skeleton width={220} height={24} />
        <Skeleton width={140} height={16} />

        <div className={styles.details}>
          {Array.from({ length: DETAILS_SKELETON_ROWS }).map((_, index) => (
            <div key={index} className={styles.row}>
              <Skeleton width={100} />
              <Skeleton width="100%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

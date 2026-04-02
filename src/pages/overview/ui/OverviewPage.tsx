import { useQuery } from '@tanstack/react-query';

import { getOverviewStats } from '@/entities/customer/api/customersApi';
import styles from './OverviewPage.module.css';

export function OverviewPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['overview-stats'],
    queryFn: getOverviewStats,
  });

  if (isLoading) {
    return <div className={styles.message}>Loading overview...</div>;
  }

  if (isError || !data) {
    return <div className={styles.message}>Failed to load overview data.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Overview</h2>
        <p className={styles.description}>Key operating metrics for the customer base.</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.label}>Total customers</span>
          <strong className={styles.value}>{data.totalCustomers}</strong>
        </article>

        <article className={styles.card}>
          <span className={styles.label}>Active customers</span>
          <strong className={styles.value}>{data.activeCustomers}</strong>
        </article>

        <article className={styles.card}>
          <span className={styles.label}>Monthly revenue</span>
          <strong className={styles.value}>${data.monthlyRevenue.toLocaleString()}</strong>
        </article>

        <article className={styles.card}>
          <span className={styles.label}>Enterprise customers</span>
          <strong className={styles.value}>{data.enterpriseCustomers}</strong>
        </article>
      </div>
    </section>
  );
}

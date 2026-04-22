import styles from './CustomerStatusBadge.module.css';

interface CustomerStatusBadgeProps {
  status: 'active' | 'inactive' | 'lead';
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  function getStatusClassName(status: 'active' | 'inactive' | 'lead'): string {
    if (status === 'active') {
      return `${styles.status} ${styles.statusActive}`;
    }

    if (status === 'inactive') {
      return `${styles.status} ${styles.statusInactive}`;
    }

    return `${styles.status} ${styles.statusLead}`;
  }

  return <span className={getStatusClassName(status)}>{status}</span>;
}

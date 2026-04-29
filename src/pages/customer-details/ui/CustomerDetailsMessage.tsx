import styles from '@/pages/customer-details/ui/CustomerDetailsPage.module.css';

export function CustomerDetailsMessage({ message }: { message: string }) {
  return <div className={styles.message}>{message}</div>;
}

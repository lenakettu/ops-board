import styles from '@/pages/customer-details/ui/CustomerDetailsPage.module.css';

interface CustomerDetailsMessageProps {
  title: string;
  description?: string;
}

export function CustomerDetailsMessage({ title, description }: CustomerDetailsMessageProps) {
  return (
    <div className={styles.message}>
      <div className={styles.messageContent}>
        <p className={styles.messageTitle}>{title}</p>

        {description ? <p className={styles.messageDescription}>{description}</p> : null}
      </div>
    </div>
  );
}

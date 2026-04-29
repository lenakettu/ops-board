import { CustomerStatusBadge } from '@/entities/customer';
import type { Customer } from '@/entities/customer/model/types.ts';
import styles from '@/pages/customer-details/ui/CustomerDetailsPage.module.css';

export function CustomerDetailsView({
  customer,
  onEdit,
}: {
  customer: Customer;
  onEdit: () => void;
}) {
  return (
    <>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.title}>{customer.name}</h2>
          <p className={styles.company}>{customer.company}</p>
        </div>

        <button type="button" className={styles.editButton} onClick={onEdit}>
          Edit
        </button>
      </div>

      <dl className={styles.details}>
        <div className={styles.row}>
          <dt>Email</dt>
          <dd>{customer.email}</dd>
        </div>

        <div className={styles.row}>
          <dt>Status</dt>
          <dd>
            <CustomerStatusBadge status={customer.status} />
          </dd>
        </div>

        <div className={styles.row}>
          <dt>Plan</dt>
          <dd>{customer.plan}</dd>
        </div>

        <div className={styles.row}>
          <dt>MRR</dt>
          <dd>${customer.mrr.toLocaleString()}</dd>
        </div>

        <div className={styles.row}>
          <dt>Created</dt>
          <dd>{new Date(customer.createdAt).toLocaleDateString()}</dd>
        </div>
      </dl>
    </>
  );
}

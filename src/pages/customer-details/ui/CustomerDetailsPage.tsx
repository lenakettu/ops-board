import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CustomerStatusBadge } from '@/entities/customer';
import { getCustomerById } from '@/entities/customer/api/customersApi';
import { CustomerEditForm } from '@/features/customer-form/ui/CustomerEditForm';

import styles from './CustomerDetailsPage.module.css';

export function CustomerDetailsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { customerId } = useParams<{ customerId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById(customerId ?? ''),
    enabled: customerId !== undefined,
  });

  if (isLoading) {
    return <div className={styles.message}>Loading customer details...</div>;
  }

  if (isError || !data) {
    return <div className={styles.message}>Customer not found.</div>;
  }

  return (
    <section className={styles.page}>
      <Link to="/customers" className={styles.backLink}>
        ← Back to customers
      </Link>

      <div className={styles.card}>
        {isEditing ? (
          <CustomerEditForm
            customer={data}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.title}>{data.name}</h2>
                <p className={styles.company}>{data.company}</p>
              </div>

              <button
                type="button"
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>

            <dl className={styles.details}>
              <div className={styles.row}>
                <dt>Email</dt>
                <dd>{data.email}</dd>
              </div>

              <div className={styles.row}>
                <dt>Status</dt>
                <dd>
                  <CustomerStatusBadge status={data.status} />
                </dd>
              </div>

              <div className={styles.row}>
                <dt>Plan</dt>
                <dd>{data.plan}</dd>
              </div>

              <div className={styles.row}>
                <dt>MRR</dt>
                <dd>${data.mrr}</dd>
              </div>

              <div className={styles.row}>
                <dt>Created</dt>
                <dd>{new Date(data.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </section>
  );
}

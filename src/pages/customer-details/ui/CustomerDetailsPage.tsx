import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getCustomerById } from '@/entities/customer/api/customersApi';
import { CustomerEditForm } from '@/features/customer-edit';
import { CustomerDetailsMessage } from '@/pages/customer-details/ui/CustomerDetailsMessage.tsx';
import { CustomerDetailsSkeleton } from '@/pages/customer-details/ui/CustomerDetailsSkeleton.tsx';
import { CustomerDetailsView } from '@/pages/customer-details/ui/CustomerDetailsView.tsx';

import styles from './CustomerDetailsPage.module.css';

export function CustomerDetailsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { customerId } = useParams<{ customerId: string }>();

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById(customerId ?? ''),
    enabled: customerId !== undefined,
  });

  if (isLoading) {
    return <CustomerDetailsSkeleton />;
  }

  if (isError) {
    return (
      <CustomerDetailsMessage
        title="Failed to load customer"
        description="Please try again later."
      />
    );
  }

  if (!customer) {
    return (
      <CustomerDetailsMessage
        title="Customer not found"
        description="This customer does not exist or may have been removed."
      />
    );
  }

  return (
    <section className={styles.page}>
      <Link to="/customers" className={styles.backLink}>
        ← Back to customers
      </Link>

      <div className={styles.card}>
        {isEditing ? (
          <CustomerEditForm
            customer={customer}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <CustomerDetailsView customer={customer} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </section>
  );
}

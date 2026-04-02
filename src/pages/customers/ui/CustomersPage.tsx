import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getCustomers } from '@/entities/customer/api/customersApi';
import type { CustomersFilters } from '@/entities/customer/model/types';
import { defaultCustomersFilters } from '../model/constants';
import styles from './CustomersPage.module.css';

export function CustomersPage() {
  const [filters] = useState<CustomersFilters>(defaultCustomersFilters);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => getCustomers(filters),
  });

  if (isLoading) {
    return <div className={styles.message}>Loading customers...</div>;
  }

  if (isError || !data) {
    return <div className={styles.message}>Failed to load customers.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Customers</h2>
          <p className={styles.description}>Customer directory for account operations.</p>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>Total: {data.total}</span>
          <span className={styles.metaItem}>
            Page {data.page} / {data.totalPages}
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <ul className={styles.list}>
          {data.items.map((customer) => (
            <li key={customer.id} className={styles.item}>
              <div className={styles.itemMain}>
                <Link to={`/customers/${customer.id}`} className={styles.link}>
                  {customer.name}
                </Link>
                <p className={styles.company}>{customer.company}</p>
              </div>

              <div className={styles.itemMeta}>
                <span>{customer.email}</span>
                <span>{customer.plan}</span>
                <span>${customer.mrr}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

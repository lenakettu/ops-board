import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getCustomers } from '@/entities/customer/api/customersApi';
import { CustomerFilters } from '@/features/customer-filters/ui/CustomerFilters';
import { CustomersPagination } from '@/widgets/customers-pagination/ui/CustomersPagination';
import { CustomersTable } from '@/widgets/customers-table/ui/CustomersTable';

import {
  defaultCustomersFilters,
  resetFilters,
  updatePage,
  updatePlan,
  updateSearch,
  updateStatus,
} from '../model/tableState';
import styles from './CustomersPage.module.css';

export function CustomersPage() {
  const [filters, setFilters] = useState(defaultCustomersFilters);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => getCustomers(filters),
  });

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Customers</h2>
          <p className={styles.description}>Customer directory for account operations.</p>
        </div>
      </div>

      <CustomerFilters
        filters={filters}
        onSearchChange={(value) => {
          setFilters((prev) => updateSearch(prev, value));
        }}
        onStatusChange={(value) => {
          setFilters((prev) => updateStatus(prev, value));
        }}
        onPlanChange={(value) => {
          setFilters((prev) => updatePlan(prev, value));
        }}
        onReset={() => {
          setFilters(resetFilters());
        }}
      />

      <CustomersTable items={data?.items ?? []} isLoading={isLoading} isError={isError} />

      {data ? (
        <CustomersPagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={(page) => {
            setFilters((prev) => updatePage(prev, page));
          }}
        />
      ) : null}
    </section>
  );
}

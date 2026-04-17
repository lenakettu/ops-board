import styles from '@/widgets/customers-pagination/ui/CustomersPagination.module.css';

export interface CustomersPaginationProps {
  page: number;
  totalPages: number;

  onPageChange: (page: number) => void;
}

export function CustomersPagination({ page, totalPages, onPageChange }: CustomersPaginationProps) {
  return (
    <div className={styles.container}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>

      <span className={styles.info}>
        {page} / {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
}

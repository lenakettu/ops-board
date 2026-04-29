import { Link, useNavigate } from 'react-router-dom';

import styles from './ErrorPage.module.css';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>OOPS...</p>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.description}>
          We could not load this page. Please go back or return to the overview.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              void navigate(-1);
            }}
          >
            Go back
          </button>

          <Link to="/" className={styles.primaryButton}>
            Go to overview
          </Link>
        </div>
      </div>
    </div>
  );
}

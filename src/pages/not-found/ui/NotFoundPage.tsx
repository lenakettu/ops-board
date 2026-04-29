import { Link, useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or may have been moved.
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

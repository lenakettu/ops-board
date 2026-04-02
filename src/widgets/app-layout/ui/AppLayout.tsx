import { NavLink, Outlet } from 'react-router-dom';

import styles from './AppLayout.module.css';

const navigationItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/customers', label: 'Customers', end: false },
];

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>OpsBoard</div>

        <nav className={styles.nav}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.kicker}>Internal admin dashboard</p>
          <h1 className={styles.title}>Operations Control Panel</h1>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

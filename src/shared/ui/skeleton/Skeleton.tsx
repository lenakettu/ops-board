import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ width = '100%', height = 16 }: SkeletonProps) {
  return <div className={styles.skeleton} style={{ width, height }} />;
}

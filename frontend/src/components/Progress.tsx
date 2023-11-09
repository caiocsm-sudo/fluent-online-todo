import styles from './css/Progress.module.css';

export default function Progress({ progress }: { progress: number }) {
  return (
    <div className={styles['outer-progress']}>
      <div className={styles['inner-progress']} style={{ width: `${progress}%` }}></div>
    </div>
  );
}
